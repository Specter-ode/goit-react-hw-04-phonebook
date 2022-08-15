import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('my-contacts'));
    if (items && items.length) {
      setContacts(items);
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
      return;
    }
    firstRender.current = false;
  }, [contacts]);

  const addNewContact = newContactData => {
    const { name } = newContactData;
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
    const newContact = { ...newContactData, id: nanoid() };
    console.log('contact: ', newContact);
    console.log('contacts: ', contacts);
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const changeFilter = e => {
    setFilter(e.target.value);
  };
  return (
    <div>
      <Container>
        <Section title="Phonebook">
          <ContactForm catchSubmitInfo={addNewContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length > 0 ? (
            <>
              <Filter valueFromFilter={filter} catchFilterInfo={changeFilter} />
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
