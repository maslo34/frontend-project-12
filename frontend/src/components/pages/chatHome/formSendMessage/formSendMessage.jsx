import leoProfanity from 'leo-profanity';

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
      const cleanedMessage = leoProfanity.clean(values.message);
      !!values.message && sendMessege(cleanedMessage, channelId, username);
      values.message = '';
      
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.body}
          aria-label="Новое сообщение"
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
