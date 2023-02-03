import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './addContact.module.css';

const AddContact = ({ onSubmit }) => {
  const [state, setState] = useState({ name: '', number: '' });
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };

  const handleSubmt = e => {
    e.preventDefault();
    const result = onSubmit({ name, number });
    if (result) {
      reset();
    }
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmt} className={styles.form}>
      <input
        value={name}
        onChange={handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        value={number}
        onChange={handleChange}
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

// class AddContact extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleSubmt = e => {
//     e.preventDefault();

//     const { onSubmit } = this.props;
//     const result = onSubmit({ ...this.state });
//     if (result) {
//       this.reset();
//     }
//   };

//   reset() {
//     this.setState({ name: '', number: '' });
//   }

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmt} className={styles.form}>
//         <input
//           value={this.state.name}
//           onChange={this.handleChange}
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//         />
//         <input
//           value={this.state.number}
//           onChange={this.handleChange}
//           type="tel"
//           name="number"
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//         />
//         <button type="submit" className={styles.button}>
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }
