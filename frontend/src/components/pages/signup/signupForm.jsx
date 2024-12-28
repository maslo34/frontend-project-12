import * as Yup from 'yup';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import { t } from 'i18next';

import { login } from '../../../slices/authUserSlice';
import { fetchToken } from '../../../fetchApi';

import CustomForm from '../../newForm';

import ImageSignUp from './signUpImage.jpg';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchWrapper = (data) => dispatch(login(data));
  const [fetchError, setfetchError] = useState(false);
  const hendleFetchError = (err) => setfetchError(err);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('errorValidation.minName'))
      .max(20, t('errorValidation.maxName'))
      .required(t('errorValidation.required')),
    password: Yup.string()
      .min(6, t('errorValidation.minPassword'))
      .required(t('errorValidation.required')),
    confirmPassword: Yup.string()
      .required(t('errorValidation.required'))
      .oneOf([Yup.ref('password'), null], t('errorValidation.oneof')),
  });
  const dataForm = {
    formName: t('signupPage.title'),
    field: [
      {
        name: 'username',
        placeholder: t('signupPage.placeholderUsername'),
        type: 'username',
      },
      {
        name: 'password',
        placeholder: t('signupPage.placeholderPassword'),
        type: 'password',
      },
      {
        name: 'confirmPassword',
        placeholder: t('signupPage.placeholderconfirmPassword'),
        type: 'password',
      },
    ],
    button: {
      submit: (value) => fetchToken(
        navigate,
        'signup',
        value,
        dispatchWrapper,
        hendleFetchError,
      ),
      name: t('signupPage.buttonSubmit'),
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
