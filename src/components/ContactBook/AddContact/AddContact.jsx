import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './addContact.module.css';

const AddContact = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const [state, setState] = useState({ name: '', number: '' });

  const reset = () => {
    setName('');
    setNumber('');
    // setState({ name: '', number: '' });
  };

  const handleSubmt = e => {
    e.preventDefault();
    const result = onSubmit({ name, number });
    if (result) {
      reset();
    }
  };

  // const handleSubmt = e => {
  //   e.preventDefault();
  //   const result = onSubmit({ ...state });
  //   if (result) {
  //     reset();
  //   }
  // };

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setState(prevState => {
  //     return { ...prevState, [name]: value };
  //   });
  // };

  // const { name, number } = state;

  return (
    <form onSubmit={handleSubmt} className={styles.form}>
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
        // onChange={handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        value={number}
        // onChange={handleChange}
        onChange={({ target }) => setNumber(target.value)}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
};
export default AddContact;

AddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
