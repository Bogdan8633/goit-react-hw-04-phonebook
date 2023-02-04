import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactBook from './ContactBook/ContactBook';
import AddContact from './ContactBook/AddContact/AddContact';
import Filter from './ContactBook/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localSavedContacts = JSON.parse(localStorage.getItem('my-contacts'));
    return localSavedContacts?.length ? localSavedContacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    const normalaizedName = name.toLowerCase();

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalaizedName)
    ) {
      alert(`${name} is already in contacts`);
      return false;
    }

    setContacts(prevContacts => {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      return [...prevContacts, contact];
    });
    return true;
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  const isContacts = Boolean(visibleContacts.length);

  return (
    <div>
      <h1>Phonebook</h1>
      <AddContact onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {isContacts && (
        <ContactBook
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      )}
      {!isContacts && <p>No contacts in list, yet</p>}
    </div>
  );
};

export default App;
