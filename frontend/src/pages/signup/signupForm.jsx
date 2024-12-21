import CustomForm from '../../components/newForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCredentials } from '../../slices/authUserSlice';
import { registrateFetch } from '../../fetchApi';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ImageSignUp from './signUpImage.jpg';
import * as Yup from 'yup';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchWrapper = (data) => dispatch(setCredentials(data));
  const [fetchError, setfetchError] = useState(false);
  const hendleFetchError = (err) => setfetchError(err);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password'), null], 'Пароль не совподает'),
  });
  const dataForm = {
    formName: 'Регистрация',
    field: [
      {
        name: 'username',
        placeholder: 'Имя пользователя',
        type: 'username',
      },
      {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password',
      },
      {
        name: 'confirmPassword',
        placeholder: 'Подтвердите пароль',
        type: 'password',
      },
    ],
    button: {
      submit: (value) =>
        registrateFetch(
          navigate,
          'signup',
          value,
          dispatchWrapper,
          hendleFetchError
        ),
    },
    validationSchema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  };

  return (
    
    <Container className="container-fluid heig-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
              <img
                src={ImageSignUp}
                className="rounded-circle"
                alt="Registratiion Avatar"
              />
            </div>
              <CustomForm dataForm={dataForm} err={fetchError} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
