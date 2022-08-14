import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
const App = () => {
  const [state, setState] = useState(() => {
    return {
      contacts: JSON.parse(localStorage.getItem('my-contacts')) || [],
      fieldFilter: '',
    };
  });
  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);
  const addNewContact = newContactData => {
    const { name } = newContactData;
    const { contacts } = state;
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
    setState(prevState => ({
      ...prevState,
      contacts: [contact, ...prevState.contacts],
    }));
  };
  const deleteContact = contactId => {
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  const getVisibleContacts = () => {
    const { fieldFilter, contacts } = state;
    const normalizedFilter = fieldFilter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const changeFilter = e => {
    setState(prevState => ({
      ...prevState,
      fieldFilter: e.target.value,
    }));
  };
  const { fieldFilter, contacts } = state;
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
};
export default App;
