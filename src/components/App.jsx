import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export function App () {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? [])
  const [filter, setFilter] = useState('')

  const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  },[contacts])

  const addContact = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    if (isInPhoneBook(newContact)) {
      alert(newContact.name + ' is already in contacts.');
      return;
    }

    setContacts(prev => [newContact, ...prev])
  };

  const isInPhoneBook = newContact => {
    return contacts.find(({ name }) => name === newContact.name)
      ? true
      : false;
  };

  const handleFilter = e => {
    setFilter(e.currentTarget.value)
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  };

  const clearFilter = () => {
    setFilter('')
  }
   
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <Filter value={filter} onChange={handleFilter} onBlur={clearFilter}></Filter>
        <h2>Contacts</h2>
        <ContactList contacts={visibleContacts} onClick={deleteContact} />
      </div>
    );
  
}
