import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ComposeMessage = ({ navigation, route }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      // construct message with OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const messageWithOtp = `Hi, your OTP is "${otp}". ${message}`;

      // send message using online SMS service (Twilio example)
      const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'),
        },
        body: new URLSearchParams({
          To: route.params.contactPhoneNumber,
          From: '+1xxx',
          Body: messageWithOtp,
        }).toString(),
      });

      if (response.ok) {
        // message sent successfully
        navigation.goBack();
      } else {
        console.error('Error sending message:', response.status);
        // handle error
      }
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compose Message</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Enter message"
        style={styles.messageInput}
        multiline
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  messageInput: {
    width: '80%',
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ComposeMessage;

