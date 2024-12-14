import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { setCredentials } from '../slices/authUserSlice.js';

const FormAuthorization = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const fetchToken = async (formData) => {
    try {
      const request = await axios.post('/api/v1/login', formData);
      dispatch(setCredentials(request.data));
      window.localStorage.setItem('auth', JSON.stringify(request.data));
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => fetchToken(values), 
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Войти</h1>
      <Form.Group className="mb-3">
        <Form.Control
          onChange={formik.handleChange}
          type="username"
          id="username"
          name="username"
          placeholder="Ваш ник"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          onChange={formik.handleChange}
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
        ></Form.Control>
      </Form.Group>
      {error ? <div>{error}</div> : <></>}
      <Button type="submit" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};

export default FormAuthorization;

// клас на ошибку валидации формы