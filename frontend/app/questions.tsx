import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

const ImageType = require('../assets/images/image15.png');

const Questions = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/question')
      .then(response => response.json())
      .then(data => setMessage(data[0]?.text)) 
      .catch(error => {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message');
      });
  }, []);

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: 'Questions'}}/>
        <View>
          <Text style={styles.text} className='text-gray-200'> {message} </Text>
          <TouchableOpacity style={styles.button} className='text-gray-400 text-2xl'>
            <Text style={styles.buttonText}>Agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container1}>
          <Image source={ImageType}/>
        </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
    margin: 10,
  },
  container1: {
    width: width * 0.35,
    backgroundColor: '#f0f0f0',
  },
  text: {
    width: width * 0.45,
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    color: 'red',
    backgroundColor: 'white',
    borderRadius: 3,
    borderColor: 'gray',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: 'green'
  }
});


export default Questions;