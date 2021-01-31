import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import s from './ContactForm.module.css';

const initalState = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = initalState;

  handleChacheForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;
    const isvalidateForm = this.validateForm();

    if (!isvalidateForm) return;

    onAdd({ id: uuid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckContact } = this.props;
    if (!name || !number) {
      alert('Some filed is enpty');
      return false;
    }
    return onCheckContact(name);
  };

  resetForm = () => this.setState(initalState);

  render() {
    const { name, number } = this.state;
    return (
      <div className={s.form_wrapper}>
        <h1 className={s.title}>Phonebook</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className={s.wrap__input}>
            <p className={s.caption}>Number</p>
            <input
              className={s.input}
              type="text"
              name="name"
              placeholder="Enter name"
              required
              value={name}
              onChange={this.handleChacheForm}
            />
            <p className={s.caption}>Name</p>
            <input
              className={s.input}
              type="tel"
              name={'number'}
              placeholder="Enter number"
              value={number}
              onChange={this.handleChacheForm}
              required
            />
          </div>

          <button className={s.contactBtn} type="submit">
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
