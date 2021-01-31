import { useEffect, useState } from 'react';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const userContacts = localStorage.getItem('userContacts');
    const parsedContacts = JSON.parse(userContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  // useEffect(() => {
  //   const userContacts = JSON.parse(localStorage.getItem('userContacts'));
  //   if (userContacts) {
  //     setContacts(userContacts)
  //   }
  // });

  useEffect(() => {
    localStorage.setItem('userContacts', JSON.stringify(contacts));
  }, [contacts]);

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

  return (
    <div className={s.app__wrap}>
      <ContactForm
        onAdd={handleAddContact}
        onCheckContact={handleCheckUContact}
      />

      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={getVisibleContacts()}
        onRemove={handleRemoveContact}
      />
    </div>
  );
}
