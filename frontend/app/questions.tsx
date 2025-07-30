import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { colorScheme } from 'react-native-css-interop';

const ImageType = require('../assets/images/pic1.png');

type Question = {
  id: number | string;
  text: string;
  options: string[];
};

const colors = Colors[(colorScheme.get?.() ?? 'light') as 'light' | 'dark'];

const QuestionsFetch = () => {
  const [questions, setQuestion] = useState<Question[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/question')
      .then(response => response.json())
      .then(data => setQuestion(data)) 
      .catch(error => {
        console.error('Error fetching message:', error);
        setError(error);
      });
  }, []);


  const answerResponses = async (finalResponses : any) => {

    try {
      const response : any = await fetch("http://127.0.0.1:5000/api/response", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(finalResponses)
      });
      console.log(finalResponses)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Saved successfully: ', result);
    }

    catch(error){
      console.error('Error saving responses: ', error)
    }
  }


 const handleAnswerAndNextQuestion = (questionId: number | string, selectedOption: string) => {
    setAnswer(prev => {
      const updatedResponses = {...prev, [questionId]: selectedOption }
    
      if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      } 

      else {
        answerResponses(updatedResponses).then(() => {
          router.push('/thankYou'); // Navigate to thank-you page after saving responses
        }); 
      };

      return updatedResponses;

  })};

  const handlePreviousQuestion = () => {
    
    if (currentIndex > 0){
      setCurrentIndex(currentIndex - 1)
    }
    
  }

  if (error) {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Error in loading question</Text>
      </View>
  )};

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    )
  };

  const currentQuestion = questions[currentIndex];

  return (
      <View style={[styles.page, {backgroundColor: colors.background}]}>
        <Stack.Screen options={{title: `Questions`}}/>
        <View style={styles.image}>
           <Image source={ImageType} />
        </View>
        <View style={styles.container}>
        {/* {currentQuestion.options.map((question: any, index: React.Key | null | undefined) => { */}
          {/* return( */}
          <Text style={[styles.text, {color: colors.text}]}> {currentQuestion.text} </Text>
          <View style={styles.button}>
            <TouchableOpacity 
              onPress={() => {
                handleAnswerAndNextQuestion(currentQuestion.id, currentQuestion.options[0]);}} >
               <Text style={[styles.buttonText, {color: colors.primary}]}>{currentQuestion.options[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                handleAnswerAndNextQuestion(currentQuestion.id, currentQuestion.options[1]);}}>
              <Text style={[styles.buttonText, {color: colors.primary}]}>{currentQuestion.options[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                handleAnswerAndNextQuestion(currentQuestion.id, currentQuestion.options[2]);}}>
              <Text style={[styles.buttonText, {color: colors.primary}]}>{currentQuestion.options[2]}</Text>
            </TouchableOpacity>
          </View>   
          <TouchableOpacity onPress={() => {
                handlePreviousQuestion()}}>
              <Text style={{color: 'red', fontSize: 20, marginTop: 20 }}>Back</Text>
          </TouchableOpacity>           
        </View>
        
          {/* )
        })} */}
        </View>
    
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  page: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#E5F1F1',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    // width: width * 0.25,
    marginTop: 50,
  },
  text: {
    width: width * 0.25,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  buttonText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: "#ffffff",
    padding: 6,
    paddingHorizontal: 20,
    borderRadius: 10
  }
});


export default QuestionsFetch;