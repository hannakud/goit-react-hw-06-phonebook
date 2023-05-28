import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ onAddContact }) => {
  let ContactSchema = object({
    name: string().required(),
    number: string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Number is required'),
  });
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onAddContact(values);
        actions.resetForm();
      }}
    >
      <Form>
        <label className={css.labelForm}>
          <span>Name</span>
          <Field name="name" type="text" />
        </label>
        <ErrorMessage component="div" name="name" />
        <label className={css.labelForm}>
          <span>Number</span>
          <Field name="number" type="text" />
        </label>
        <ErrorMessage component="div" name="number" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
