import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector } from 'react-redux';
import { getFilteredContacts } from 'redux/contactsSlice';
import { getFilter } from 'redux/filterSlice';

export const App = () => {
  const filteredContactsList = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const emptyMessage = filter
    ? `No contacts macth "${filter}"`
    : 'Phonebook is empty. Add contacts first';

  return (
    <main className={css.main}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {filteredContactsList.length ? (
        <ContactList />
      ) : (
        <div className={css.message}>{emptyMessage}</div>
      )}
    </main>
  );
};
