import { useFormik } from 'formik';
import {
  Form,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

const CustomForm = ({ dataForm, err }) => {
  const { formName, field, button, validationSchema, initialValues } = dataForm;
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (value) => button.submit(value),
  });
  return (
    <Form className="col-12 col-md-7 mt-3 mt-md-0">
      <h1 className="text-center mb-4">{formName}</h1>
      {field.map((el, id) => {
        return (
          <FormGroup key={el.name} className="form-floating mb-3">
            <FormControl
              id={el.name}
              name={el.name}
              autoFocus={id === 0}
              placeholder={el.placeholder}
              type={el.type}
              value={formik.values[el.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.errors[el.name] && formik.touched[el.name]) || !!err
              }
            />
            <FormLabel htmlFor={el.name}>{el.placeholder}</FormLabel>
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              {formik.errors[el.name] || err}
            </Form.Control.Feedback>
          </FormGroup>
        );
      })}
      <Button
        className="w-100"
        variant="outline-primary"
        onClick={formik.handleSubmit}
      >
        {button.name}
      </Button>
    </Form>
  );
};

export default CustomForm;
