import { useState } from 'react';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleCheckUContact = name => {
    const isExistContact = !!contacts.find(contacts => contacts.name === name);

    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };

  const handleAddContact = newContact => {
    setContacts(contacts => [...contacts, newContact]);
  };

  const handleFilterChange = filter => setFilter({ filter });

  const handleRemoveContact = id =>
    setContacts(contacts => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  // componentDidMount = () => {
  //   const userContacts = JSON.parse(localStorage.getItem('userContacts'));
  //   if (userContacts) this.setState({ contacts: userContacts });
  // };

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { contacts } = this.state;
  //   if (contacts !== prevState.contacts) {
  //     localStorage.setItem('userContacts', JSON.stringify(contacts));
  //   }
  // };

  // handleAddContact = newContact =>
  //   this.setState(({ contacts }) => ({
  //     contacts: [...contacts, newContact],
  //   }));

  // handleCheckUContact = name => {
  //   const { contacts } = this.state;
  //   const isExistContact = !!contacts.find(contacts => contacts.name === name);

  //   isExistContact && alert('Contact is already exist');
  //   return !isExistContact;
  // };

  // handleRemoveContact = id =>
  //   this.setState(({ contacts }) => ({
  //     contacts: contacts.filter(contact => contact.id !== id),
  //   }));

  // handleFilterChange = filter => this.setState({ filter });

  //  const getVisibleContacts = () => {
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter.toLowerCase()),
  //     );
  //   };

  // render() {
  //   // const { filter } = this.state;
  //   const visibleContacts = this.getVisibleContacts();

  return (
    <div className={s.app__wrap}>
      <ContactForm
        onAdd={handleAddContact}
        onCheckContact={handleCheckUContact}
      />

      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={getVisibleContacts()}
        onRemove={handleRemoveContact}
      />
    </div>
  );
}
