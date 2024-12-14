import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './formSendMessage.css'

const FormSendMessage = ({ channelId }) => {
  console.log(typeof channelId)

  const {username, token} = useSelector((state) => state.auth)
  const sendMessege = async (message) => {
    console.log(message)
    const newMessage = { body: message, channelId, username}
    try {
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch(e) {
      console.log(e)
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => sendMessege(values.message),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="formMessage">
        <Form.Group>
          <Form.Control
            onChange={formik.handleChange}
            type="message"
            id="message"
            name="message"
            placeholder="Ваше сообщение"
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Отправить</Button>
      </div>
    </Form>
  );
};

export default FormSendMessage;
