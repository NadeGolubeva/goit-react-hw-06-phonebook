import React, { useState, useEffect } from 'react';
import { FormContact } from './FormContact/FormContact';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { FindContact } from './FindContact/FindContact';

const KEY_CONTACTS = 'contacts';



export const App = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem(KEY_CONTACTS)) ?? startContacts
  );
  
  useEffect(() => {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');


 const addContact = ({ name, number }) => {
  if (contacts.some(
    value => value.name.toLowerCase() === name.toLowerCase()
  ))
  {
    alert(`${name} is already in contacts`);
  } else {
    setContacts(prevState => {
      const list = [...prevState];
      list.push({
        id: nanoid(), 
        name: name,
        number: number,
      });
      return list;
    })
    }
 }
  
  const onDelete = (id) => { 
    const actualList = contacts.filter(contact => contact.id !== id);
    setContacts(actualList) ;
  }

  const filterList = () => { 
    const filterList = contacts.filter(contact => 
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    return filterList;
  }
  const onChangeInput = (e) => {
    setFilter(e.currentTarget.value);
    }

  return (
      <div
        style={{
          height: '100vh',
          fontSize: 24,
          color: '#010101',
          paddingLeft: 30,
        }}
      >
        <h1>Phonebook</h1>
        <FormContact addContact={addContact}
          
        />
        <br />
            <h2>Contacts</h2>
        <FindContact
          onChangeFilter={onChangeInput}
        filter={filter}
        /> 
    
        <Contacts contactsInfo={filterList()} onDelete={onDelete} />
      
      </div>
    );
}
