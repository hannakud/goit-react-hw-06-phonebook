import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContacts } from 'redux/contactsSlice';

const contactSchema = object({
  name: string().required(),
  number: string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const onAddContact = (values, actions) => {
    const isExist = contacts.some(
      el => el.name.toLowerCase() === values.name.trim().toLowerCase()
    );
    if (isExist) {
      alert('Contact is already exist');
      return;
    }
    dispatch(addContact({ ...values }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={onAddContact}
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
