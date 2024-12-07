import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FormAuthorization = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => console.log(JSON.stringify(values, null, 2)),
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Войти</h1>
      <Form.Group className="mb-3">
        <Form.Control onChange={formik.handleChange} type="email" id='email' name='email' placeholder="Ваш ник"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control onChange={formik.handleChange} type="password" id='password' name='password' placeholder="Пароль"></Form.Control>
      </Form.Group>
      <Button type="submit" variant="outline-primary">Войти</Button>
    </Form>
  );
};

export default FormAuthorization;
