import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
class App extends Component {
  state = {
    contacts: [],
    fieldFilter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('my-contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }
  addNewContact = newContactData => {
    const { name } = newContactData;
    const { contacts } = this.state;
    if (
      contacts.find(
        contactFromPhonebook =>
          contactFromPhonebook.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    } else if (name === '') {
      alert('Please enter your name');
      return;
    }
    const contact = { ...newContactData, id: nanoid() };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  getVisibleContacts = () => {
    const { fieldFilter, contacts } = this.state;
    const normalizedFilter = fieldFilter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  changeFilter = e => {
    this.setState({ fieldFilter: e.target.value });
  };

  render() {
    const { fieldFilter, contacts } = this.state;
    const { addNewContact, changeFilter, getVisibleContacts, deleteContact } =
      this;
    return (
      <div>
        <Container>
          <Section title="Phonebook">
            <ContactForm catchSubmitInfo={addNewContact} />
          </Section>
          <Section title="Contacts">
            {contacts.length > 0 ? (
              <>
                <Filter
                  valueFromFilter={fieldFilter}
                  catchFilterInfo={changeFilter}
                />
                <ContactList
                  contacts={getVisibleContacts()}
                  onDelete={deleteContact}
                />
              </>
            ) : (
              <p>No contacts in phonebook</p>
            )}
          </Section>
        </Container>
      </div>
    );
  }
}

export default App;
