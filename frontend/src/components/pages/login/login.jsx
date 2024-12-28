import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { t } from 'i18next';
import {
  Card,
  Col,
  Container,
  Row
} from 'react-bootstrap';

import { login } from '../../../slices/authUserSlice';
import { fetchToken } from '../../../fetchApi';

import CustomForm from '../../../components/newForm';

import ImageLogin from './loginImage.jpg';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dispatchWrapper = (data) => dispatch(login(data));

  const [fetchError, setfetchError] = useState(false);

  const hendleFetchError = (err) => setfetchError(err);

  const validationSchema = false;
  const dataForm = {
    formName: t('loginPage.title'),
    field: [
      {
        name: 'username',
        placeholder: t('loginPage.placeholderUsername'),
        type: 'username',
      },
      {
        name: 'password',
        placeholder: t('loginPage.placeholderPassword'),
        type: 'password',
      },
    ],
    button: {
      submit: (value) => fetchToken(navigate, 'login', value, dispatchWrapper, hendleFetchError),
      name: t('loginPage.buttonSubmit'),
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
              <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                <img
                  src={ImageLogin}
                  className="rounded-circle"
                  alt="Registratiion Avatar"
                />
              </div>
              <CustomForm dataForm={dataForm} err={fetchError} />
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.spanNotAccaunt')}</span>
                <Link to="/signup">{t('loginPage.linkSugnup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
