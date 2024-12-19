import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './formSendMessage.css';

const FormSendMessage = ({ channelId }) => {
  const { username } = useSelector((state) => state.auth);
  
  const token = useSelector((state) => state.auth.token);
  
  const sendMessege = async (message) => {
    const newMessage = { body: message, channelId, username };
    try {
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      sendMessege(values.message)
    },
  });

  const clearInput = (e) => {
    e.target.form.message.value = '';
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="formMessage">
        <Form.Group className="form-label-message">
          <Form.Control
            onChange={formik.handleChange}
            type="message"
            id="message"
            name="message"
            placeholder="Ваше сообщение"
            autoFocus
          ></Form.Control>
        </Form.Group>
        <Button onClick={clearInput} type="submit">
          Отправить
        </Button>
      </div>
    </Form>
  );
};

export default FormSendMessage;
