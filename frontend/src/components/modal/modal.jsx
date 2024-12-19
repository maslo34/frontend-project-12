import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { activeClassButton } from '../../utils.js';
import instanceAxios from '../../fetchApi.js';
import { setOptionModal } from '../../slices/modalSlice.js';
import { useGetChanelsApiQuery } from '../../slices/newChanelSlice.js';
import { useGetMessageApiQuery } from '../../slices/newMessagesSlice.js';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './modal.css';

const fetchAxios = async (payload, query, id) => {
  try {
    console.log(payload, query, id);
    const request = await query(payload, id);
    console.log(request.data);
  } catch (e) {
    console.log(e);
  }
};

const customFocusInput = () => {
  document.querySelector('.modal-input').focus();
};

const CustomModal = () => {
  const { refetch } = useGetMessageApiQuery();
  const customAxios = instanceAxios();
  const mappingModal = {
    addChanel: {
      metod: 'post',
      title: 'Добавить канал',
      query: (value) => customAxios.post(id, value),
    },
    removeChanel: {
      metod: 'delit',
      title: 'Удалить канал',
      body: 'Уверрены?',
      query: (value, id) => customAxios.delete(id),
    },
    editChanel: {
      metod: 'patch',
      title: 'Переименовать канал',
      query: (value, id) => customAxios.patch(`/${id}`, value),
    },
  };

  const dispatch = useDispatch();

  const modalOption = useSelector((State) => State.modal);
  const { isShow, type, id, initialValue } = modalOption;

  const handleCloseModal = () => {
    dispatch(setOptionModal({ isShow: false }));
  };
  console.log(mappingModal[type]);

  const { data, isLoading } = useGetChanelsApiQuery();
  const arrayUniqChanel = isLoading ? [] : data.map((el) => el.name);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(arrayUniqChanel, 'Введите уникальное имя канала'),
  });

  return (
    <Modal show={isShow} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{mappingModal[type].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mappingModal[type].body ? (
          <div>
            {mappingModal[type].body}
            <div className="buttonModalBlock">
              <Button variant="secondary" onClick={handleCloseModal}>
                Закрыть
              </Button>
              <Button
                onClick={() => {
                  fetchAxios(id, mappingModal[type].query, id);
                  dispatch(setOptionModal({ isShow: false }));
                  refetch();
                }}
                className={activeClassButton(isShow)}
                type="submit"
              >
                Отправить
              </Button>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{ name: initialValue }}
            validationSchema={validationSchema}
            onSubmit={(value) => {
              fetchAxios(value, mappingModal[type].query, id);
              dispatch(setOptionModal({ isShow: false }));
            }}
          >
            {({ errors }) => (
              <Form>
                <Field
                  className={
                    errors.name
                      ? 'modal-input mb-2 form-control is-invalid'
                      : 'modal-input mb-2 form-control'
                  }
                  name="name"
                  innerRef={() => customFocusInput()}
                />
                {errors.name ? <div>{errors.name}</div> : null}
                <div className="buttonModalBlock">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Закрыть
                  </Button>
                  <Button className={activeClassButton(isShow)} type="submit">
                    Отправить
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
