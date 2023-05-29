import css from './ContactList.module.css';
import { setFilter } from 'redux/filterSlice';
import { deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const list = useSelector(getFilteredContacts);
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
    dispatch(setFilter(''));
  };

  return (
    <ul className={css.contactList}>
      {list.map(({ id, name, number }) => {
        return (
          <li className={css.contactItem} key={id}>
            <span>{name}: </span>
            <span>{number} </span>
            <button className={css.button} onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
