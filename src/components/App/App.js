import { Component } from 'react';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const userContacts = JSON.parse(localStorage.getItem('userContacts'));
    if (userContacts) this.setState({ contacts: userContacts });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('userContacts', JSON.stringify(contacts));
    }
  };

  handleAddContact = newContact =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckUContact = name => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(contacts => contacts.name === name);

    isExistContact && alert('Contact is already exist');
    return !isExistContact;
  };

  handleRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={s.app__wrap}>
        <ContactForm
          onAdd={this.handleAddContact}
          onCheckContact={this.handleCheckUContact}
        />

        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}
