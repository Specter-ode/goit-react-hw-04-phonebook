import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    id: '',
    name: '',
    number: '',
    gender: 'unknown',
    adult: false,
  };
  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.catchSubmitInfo(this.state);
    this.clearFields();
  };
  handleAdultChange = e => {
    this.setState({ adult: e.target.checked });
  };
  clearFields = () => {
    this.setState({
      name: '',
      number: '',
      gender: 'unknown',
      adult: false,
    });
  };

  render() {
    const { name, gender, number, adult } = this.state;
    const { handleAdultChange, handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={handleChange}
            className={s.input}
          />
          Name
        </label>
        <label className={s.label}>
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            className={s.input}
          />
          Phone number
        </label>
        <div className={s.gender}>
          <p className={s.gender__info}>Gender:</p>
          <label className={s.gender__label}>
            <input
              type="radio"
              name="gender"
              value="unknown"
              checked={gender === 'unknown'}
              onChange={handleChange}
              className={s.gender__input}
            />
            Don't specify
          </label>
          <label className={s.gender__label}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleChange}
              className={s.gender__input}
            />
            Male
          </label>
          <label className={s.gender__label}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleChange}
              className={s.gender__input}
            />
            Female
          </label>
        </div>
        <label className={s.age__label}>
          <input
            type="checkbox"
            name="adult"
            checked={adult}
            onChange={handleAdultChange}
            className={s.age__input}
          />
          I am already 18 years old
        </label>
        <button type="submit" disabled={!adult} className={s.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};
export default ContactForm;
