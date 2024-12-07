import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { setCredentials } from '../slices/authUserSlice.js';

const FormAuthorization = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState(false)
  const [error, setError] = useState(false)

  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => setFormData(values),
  })

  useEffect(() => {
    const fetchToken = async () => {
      try {
      const request = await axios.post('/api/v1/login', formData);
      dispatch(setCredentials(request.data))
      window.localStorage.setItem('auth', JSON.stringify(request.data))
      console.log(window.localStorage.getItem('auth'))
      navigate('/')
      } catch (e) {
        console.log(e)
        setError(e.message)
      }
    }
    
    if (formData) {
      fetchToken()
    }
  }, [formData, dispatch, navigate])
  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Войти</h1>
      <Form.Group className="mb-3">
        <Form.Control onChange={formik.handleChange} type="username" id='username' name='username' placeholder="Ваш ник"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control onChange={formik.handleChange} type="password" id='password' name='password' placeholder="Пароль"></Form.Control>
      </Form.Group>
      {error?<div>{error}</div>:<></>}
      <Button type="submit" variant="outline-primary">Войти</Button>
    </Form>
  );
};

export default FormAuthorization;
