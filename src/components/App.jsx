import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  getContacts,
  getFilteredContacts,
} from 'redux/contactsSlice';
import { getFilter, setFilter } from 'redux/filterSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContactsList = useSelector(getFilteredContacts);

  const onAddContact = formValue => {
    const isExist = contacts.some(
      el => el.name.toLowerCase() === formValue.name.trim().toLowerCase()
    );
    if (isExist) {
      alert('Contact is already exist');
      return;
    }
    dispatch(addContact(formValue));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
    dispatch(setFilter(''));
  };

  const emptyMessage = filter
    ? `No contacts macth "${filter}"`
    : 'Phonebook is empty. Add contacts first';

  return (
    <main className={css.main}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChangeFilter={event => dispatch(setFilter(event.target.value))}
      />
      {filteredContactsList.length ? (
        <ContactList
          list={filteredContactsList}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <div>{emptyMessage}</div>
      )}
    </main>
  );
};
