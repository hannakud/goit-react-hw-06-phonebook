import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: [],
  },
  reducers: {
    addContact(state, action) {
      const { name, number } = action.payload;
      state.value = [
        ...state.value,
        {
          name,
          number,
          id: nanoid(),
        },
      ];
    },
    deleteContact(state, action) {
      state.value = state.value.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;

export const getContacts = state => state.contacts.value;

export const getFilteredContacts = state => {
  return state.contacts.value.filter(el =>
    el.name.toLowerCase().includes(state.filter.value.toLowerCase().trim())
  );
};
