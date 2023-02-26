import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetch messages from server and update state
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://example.com/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  const renderMessageItem = ({ item }) => {
    return (
      <View style={styles.messageItem}>
        <Text style={styles.contactName}>{item.contactName}</Text>
        <Text style={styles.messageTime}>{item.messageTime}</Text>
        <Text style={styles.otp}>{item.otp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages List</Text>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.messageId}
        style={styles.messagesList}
      />
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
  messagesList: {
    width: '100%',
  },
  messageItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  otp: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default MessagesList;
