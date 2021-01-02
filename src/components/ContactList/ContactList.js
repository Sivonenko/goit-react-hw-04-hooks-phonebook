import s from './ContactList.module.css';
import PropTypes from 'prop-types';
const ContacListItem = ({ id, name, number, onRemove }) => {
  return (
    <li>
      {name}: {number}{' '}
      <button className={s.btn__list} onClick={() => onRemove(id)}>
        delete
      </button>
    </li>
  );
};

const ContactList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ul>
      {contacts.map(contact => (
        <ContacListItem {...contact} onRemove={onRemove} />
      ))}
    </ul>
  );
};
ContactList.protoTypes = {
  contacts: PropTypes.array.isRequired,
  ContacListItem: PropTypes.func.isRequired,
};

export default ContactList;
