import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router';

import { setCredentials } from '../../slices/authUserSlice';
import { registrateFetch } from '../../fetchApi';

import { Card, Col, Container, Row } from 'react-bootstrap';
import CustomForm from '../../components/newForm';

import ImageLogin from './loginImage.jpg';


import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchWrapper = (data) => dispatch(setCredentials(data));
  const [fetchError, setfetchError] = useState(false);
  const hendleFetchError = (err) => setfetchError(err);

  const validationSchema = false;
  const dataForm = {
    formName: 'Войти',
    field: [
      {
        name: 'username',
        placeholder: 'Ваш ник',
        type: 'username',
      },
      {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password',
      },
    ],
    button: {
      submit: (value) =>
        registrateFetch(
          navigate,
          'login',
          value,
          dispatchWrapper,
          hendleFetchError
        ),
    },
    validationSchema,
    initialValues: {
      username: '',
      password: '',
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
                  src={ImageLogin}
                  className="rounded-circle"
                  alt="Registratiion Avatar"
                />
              </div>
              <CustomForm dataForm={dataForm} err={fetchError} />
            </Card.Body>
            <Card.Footer className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                <Link to='/signup'>Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
