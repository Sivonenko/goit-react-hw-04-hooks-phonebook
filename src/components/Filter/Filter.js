import s from './Filter.module.css';
const Filter = ({ filter, onChange }) => {
  return (
    <div className={s.filter__wrap}>
      <h2 className={s.filtter_title}>Contacts</h2>
      <p className={s.filter__caption}>Find contacts by name</p>
      <input
        className={s.filter_input}
        type="text"
        name="filter"
        value={filter}
        onChange={({ target }) => onChange(target.value)}
        placeholder="Enter name for Search"
      />
    </div>
  );
};

export default Filter;
