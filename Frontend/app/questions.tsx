import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation } from 'expo-router';


type Question = {
  id: string;
  question: string;
  options: string[];
  type?: string;
  imagekey?: string;
};

export const Questionnaire: React.FC = () => {
  // Store groups as an object of arrays, not a flat array
  const [groups, setGroups] = useState<{ [key: string]: Question[] }>({}); //Group object stores questions in groups
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [groupIndex, setGroupIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0); //Track Position of questions
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const imageMap: { [id: string]: any } = {
    personal1: require('../assets/images/questionimg/personal1.jpg'),// maps imagekey to images in assets 
    behavioral2: require('../assets/images/questionimg/behavioral2.jpg'),
    behavioral1: require('../assets/images/questionimg/behavioral1.jpg'),
    personal2: require('../assets/images/questionimg/personal2.jpg'),
  };

  useEffect(() => {
    const fetchQuestions = async () => { //Fetches questions and handles errors
      try {
        const response = await fetch('http://127.0.0.1:5000/api/questions');
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setGroups(data.groups);  // Use data.groups here
      } catch (error: any) {
        Alert.alert('Error fetching questions', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Extract group names, questions and validate indexes
  const groupNames = Object.keys(groups); 
  const currentGroupName = groupNames[groupIndex];
  const currentGroup = groups[currentGroupName] || [];
  const currentQuestion = currentGroup[questionIndex];

  const totalGroups = groupNames.length;
  const totalQuestionsInGroup = currentGroup.length;

  const handleOptionSelect = (questionId: string, option: string) => { //updates answers when user selects option
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // validates that all questions are answered 
  const handleSubmit = async () => {
    const allQuestions = groupNames.flatMap((g) => groups[g]);
    if (allQuestions.some((q) => !answers[q.id])) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting.');
      return;
    }
    console.log('Submitting answers:', answers);  // Debug log
    try {
      const response = await fetch('http://127.0.0.1:5000/api/responses', {  
        method: 'POST',       //updates backend with answers
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error('Failed to submit responses');
      Alert.alert('Thank you!', 'Your responses have been submitted.');
      setAnswers({});
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Submission error', error.message);
    }
  };

  const goNext = () => {//Advances to next question or groups
    if (questionIndex + 1 < totalQuestionsInGroup) {
      setQuestionIndex(questionIndex + 1);
    } else if (groupIndex + 1 < totalGroups) {
      setGroupIndex(groupIndex + 1);
      setQuestionIndex(0);
    }
  };

  const goBack = () => {// goes back 
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (groupIndex > 0) {
      const prevGroupName = groupNames[groupIndex - 1];
      setGroupIndex(groupIndex - 1);
      setQuestionIndex(groups[prevGroupName].length - 1);
    }
  };

  if (loading) {//Handles loading
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading questions…</Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>No questions found.</Text>
      </View>
    );
  }

  return ( //Allows verical scrolling
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

      <Text style={[styles.groupTitle, { color: colors.text, marginBottom: 10 }]}>
      </Text>

      <Image source={imageMap[currentQuestion.imagekey || 'personal1']} style={styles.image} />

      <Text style={[styles.questionText, { color: colors.text }]}>{currentQuestion.question}</Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (    
          <TouchableOpacity
            key={option}
            onPress={() => handleOptionSelect(currentQuestion.id, option)}
            style={[
              styles.optionButton,
              answers[currentQuestion.id] === option && styles.optionSelected,
            ]}
          >
            <Text style={[styles.optionText, { color: '#fff' }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navigationButtons}>
        {(groupIndex > 0 || questionIndex > 0) && (
          <TouchableOpacity onPress={goBack} style={[styles.navButton, { backgroundColor: '#888' }]}>
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        {groupIndex === totalGroups - 1 && questionIndex === totalQuestionsInGroup - 1 ? (
          <TouchableOpacity onPress={handleSubmit} style={[styles.navButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.navButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={goNext} style={[styles.navButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  optionButton: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#4b5563',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#3b82f6',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
