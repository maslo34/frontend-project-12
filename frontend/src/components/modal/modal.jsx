import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { useGetChanelsApiQuery } from '../../slices/newChanelSlice.js';
import { useGetMessageApiQuery } from '../../slices/newMessagesSlice.js';
import { useSelector, useDispatch } from 'react-redux';

import { activeClassButton } from '../../utils.js';
import instanceAxios from '../../fetchApi.js';
import { setOptionModal } from '../../slices/modalSlice.js';
import { actualChanelId } from '../../slices/actualChanelSlice.js'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { t } from 'i18next';

import { fetchChanel } from '../../fetchApi.js';

const CustomModal = () => {
  const refContainer = useRef('');
  useEffect(() => {
    refContainer.current.focus();
  }, []);
  
  const dispatch = useDispatch();
  const customAxios = instanceAxios('channels');

  const { data, isLoading } = useGetChanelsApiQuery();
  const { refetch } = useGetMessageApiQuery();

  const modalOption = useSelector((State) => State.modal);
  const {chanelId} = useSelector((State) => State.actualChanelId);
  const { isShow, type, id, initialValue, toastMessage } = modalOption;

  const arrayUniqChanel = isLoading ? [] : data.map((el) => el.name);

  const handleCloseModal = () => {
    dispatch(setOptionModal({ isShow: false }));
  };
  const handleNewActualChanel = (chanel) => {
    const { id, name } = chanel
    console.log(chanel)
    dispatch(actualChanelId({chanelId: id, name}))
  }

  const notify = (message) => toast.success(message);

  const mappingModal = {
    addChanel: {
      metod: 'post',
      title: t('modal.addChanel'),
      query: (value) => customAxios.post(id, value),
    },
    removeChanel: {
      metod: 'delit',
      title: t('modal.removeChanel'),
      body: t('modal.isDelete'),
      query: (id) => customAxios.delete(id),
    },
    editChanel: {
      metod: 'patch',
      title: t('modal.editChanel'),
      query: (value, id) => customAxios.patch(`/${id}`, value),
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('errorValidation.minName'))
      .max(20, t('errorValidation.maxName'))
      .notOneOf(arrayUniqChanel, t('errorValidation.uniqNameChanel')),
  });

  const formik = useFormik({
    initialValues: { name: initialValue },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      console.log(value)
      const cleanChanel = leoProfanity.clean(value.name)
      fetchChanel({name: cleanChanel}, mappingModal[type].query, id, handleNewActualChanel);
      dispatch(setOptionModal({ isShow: false }));
    },
  });

  return (
    <Modal show={isShow} onHide={handleCloseModal} className="">
      <Modal.Header closeButton>
        <Modal.Title>{mappingModal[type].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mappingModal[type].body ? (
          <>
            <p className="lead">{mappingModal[type].body}</p>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2 btn btn-secondary"
                variant="secondary"
                onClick={handleCloseModal}
              >
                {t('modal.close')}
              </Button>
              <Button
                onClick={() => {
                  fetchChanel(id, mappingModal[type].query, id);
                  dispatch(setOptionModal({ isShow: false }));
                  id === chanelId && dispatch(actualChanelId({chanelId: '1', name: 'general'}))
                  refetch();
                  notify(toastMessage)
                }}
                className={activeClassButton(isShow)}
                type="submit"
                variant="danger"
                ref={refContainer}
              >
                {t('modal.send')}
              </Button>
            </div>
          </>
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl
                className="mb-2 form-control"
                ref={refContainer}
                name="name"
                required=""
                onChange={formik.handleChange}
                value={formik.values.name}
                isInvalid={formik.errors.name}
              />
               <Form.Label className='visually-hidden' for='name'>{t('modal.labelName')}</Form.Label>
              {formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </FormGroup>

            <div className="d-flex justify-content-end">
              <Button className='me-2 btn btn-secondary' variant="secondary" onClick={handleCloseModal}>
                {t('modal.close')}
              </Button>
              <Button onClick={() => notify(toastMessage)} className={activeClassButton(isShow)} type="submit">
                {t('modal.send')}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
