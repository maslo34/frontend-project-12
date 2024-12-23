import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { sendMessege } from '../../../../fetchApi';
import { clearInput } from '../../../../utils';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { t } from 'i18next';

const FormSendMessage = ({ channelId }) => {
  const { username } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      !!values.message && sendMessege(values.message, channelId, username);
      values.message = '';
      // if (values.message !== '') {
      //   console.log(values)
      //   sendMessege(values.message, channelId, username);
      //   values.message = '';
      // }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.body}
          type="message"
          id="message"
          name="message"
          placeholder={t('chatHome.messageFormPlaceholder')}
          autoFocus
        ></Form.Control>
        <Button onClick={clearInput} type="submit">
          {t('chatHome.sendMessage')}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default FormSendMessage;
