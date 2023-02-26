import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/contacts.json")
      .then((response) => response.json())
      .then((data) => setContacts(data.contacts));
  }, []);

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>{contact.firstName} {contact.lastName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
