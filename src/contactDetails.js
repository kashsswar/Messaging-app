import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const handleSendMessage = () => {
    fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: selectedContact.phoneNumber,
        body: `Hi ${selectedContact.firstName}, your OTP is ${otp}`,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Message sent successfully!');
        } else {
          alert(`Error sending message: ${data.message}`);
        }
      })
      .catch(error => {
        alert(`Error sending message: ${error.message}`);
      });
  };
  

const ContactDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const [contact, setContact] = useState({});
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendButtonClick = () => {
    // Implement the logic for sending a message using an online SMS service
    // ...
    alert(`Message sent to ${contact.firstName} ${contact.lastName}: ${message}`);
  };

  const handleBackButtonClick = () => {
    history.goBack();
  };

  // Fetch the details of the selected contact using the contact ID
  useEffect(() => {
    fetch(`/data/contacts.json`)
      .then((response) => response.json())
      .then((data) => {
        const contact = data.contacts.find((contact) => contact.id === id);
        if (contact) {
          setContact(contact);
        } else {
          alert(`Contact with ID ${id} not found`);
          history.goBack();
        }
      });
  }, [id, history]);

  return (
    <div>
      <h2>Contact Details</h2>
      <p>Name: {contact.firstName} {contact.lastName}</p>
      <p>Phone Number: {contact.phone}</p>
      <div>
        <textarea
          placeholder={`Hi ${contact.firstName}, your OTP is "123456"`}
          value={message}
          onChange={handleInputChange}
        />
        <button onClick={handleSendButtonClick}>Send Message</button>
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
    </div>
  );
};

export default ContactDetails;
