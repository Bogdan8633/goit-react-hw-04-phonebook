import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactBook from './ContactBook/ContactBook';
import AddContact from './ContactBook/AddContact/AddContact';
import Filter from './ContactBook/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts && contacts.length) {
      //contacts?.length
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addNewContact = ({ name, number }) => {
    const normalaizedName = name.toLowerCase();

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalaizedName
      )
    ) {
      alert(`${name} is already in contacts`);
      return false;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    return true;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactBook
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
