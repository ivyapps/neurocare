import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageRequireSource } from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Define the shape of a question object
interface Question {
  question: string;
}

// Define the condition image type
type Condition = 'General Questions' | 'ADHD' | 'Autism' | 'Anxiety';

const Questions = () => {
  const [question, setQuestion] = useState('Loading...');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<Record<string, number> | null>(null);
  const [condition, setCondition] = useState<Condition>('General Questions'); // Default to General Questions
  const router = useRouter(); // For navigation

  // Images for conditions with explicit typing
  const conditionImages: Record<Condition, ImageRequireSource | null> = {
    'General Questions': null,
    ADHD: require('../assets/images/ADHD.jpg'),
    Autism: null,
    Anxiety: null,
  };

  useEffect(() => {
    console.log('Current condition:', condition); // Debug log
    fetchQuestions();
  }, [condition]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/questions/${condition}`);
      console.log(`API Response Status: ${response.status}`);
      const data = await response.json();
      console.log(`Fetched data for ${condition}:`, data);
      if (response.ok && data && Array.isArray(data)) {
        setQuestions(data as Question[]);
        setCurrentIndex(0); // Reset index when changing conditions
        setAnswers({}); // Clear previous answers
        if (data.length > 0) {
          setQuestion(data[0]?.question || 'No question available');
        } else {
          setQuestion('No questions available');
        }
      } else {
        setQuestion('Failed to load questions: Invalid data format');
      }
    } catch (error) {
      console.error(`Error fetching questions for ${condition}:`, error);
      setQuestion('Failed to load questions: Network or server error');
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      newAnswers[currentIndex] = answer;
      return newAnswers;
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setQuestion(questions[currentIndex + 1]?.question || 'No more questions');
    } else {
      submitAssessment();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setQuestion(questions[currentIndex - 1]?.question || 'No more questions');
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[currentIndex];
        return newAnswers;
      });
    }
  };

  const submitAssessment = async () => {
    try {
      console.log('Answers submitted:', answers);
      const response = await fetch('http://127.0.0.1:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'User',
          email: 'user@example.com',
          gender: 'Unknown',
          answers: answers,
          condition: condition,
        }),
      });
      const data = await response.json();
      console.log('Submit response:', data);
      if (data.results) {
        setResult(data.results);
      } else {
        console.error('No results in response:', data);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const goToHome = () => {
    router.push('/');
  };

  const renderQuestion = () => {
    const currentImage = conditionImages[condition];
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: `Question ${currentIndex + 1} - ${condition}` }} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <View style={styles.conditionSelector}>
              <TouchableOpacity
                key={'General Questions'}
                style={[styles.conditionButton, condition === 'General Questions' && styles.selectedConditionButton]}
                onPress={() => setCondition('General Questions')}
              >
                <Text style={styles.conditionButtonText}>General Questions</Text>
              </TouchableOpacity>
              {(['ADHD', 'Autism', 'Anxiety'] as const).map((cond) => (
                <TouchableOpacity
                  key={cond}
                  style={[styles.conditionButton, condition === cond && styles.selectedConditionButton]}
                  onPress={() => setCondition(cond)}
                >
                  <Text style={styles.conditionButtonText}>{cond}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.conditionText}>Condition: {condition}</Text>
            <Text style={styles.questionText}>{question}</Text>
            {questions.length > 0 && currentIndex < questions.length && (
              <View style={styles.buttonContainer}>
                {currentIndex > 0 && (
                  <TouchableOpacity style={styles.answerButton} onPress={handleBack}>
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>
                )}
                {['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree', 'I Don\'t Know'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.answerButton}
                    onPress={() => handleAnswer(option)}
                  >
                    <Text style={styles.buttonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {currentImage && <Image source={currentImage} style={styles.image} resizeMode="contain" />}
        </View>
      </View>
    );
  };

  const renderResult = () => {
    if (!result) return null;
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Assessment Results' }} />
        <Text style={styles.text}>Assessment Results</Text>
        {condition === 'General Questions' ? (
          <Text style={styles.resultDetails}>
            Based on your general answers, you may be experiencing:
            {Object.entries(result).map(([cond, percentage]) => (
              <Text key={cond} style={styles.resultConditionText}>
                - {cond}: {percentage.toFixed(1)}%
              </Text>
            ))}
          </Text>
        ) : (
          <Text style={styles.resultDetails}>
            Based on your answers, your condition is:
            {Object.entries(result).map(([cond, percentage]) => (
              <Text key={cond} style={styles.resultConditionText}>
                - {cond}: {percentage.toFixed(1)}%
              </Text>
            ))}
          </Text>
        )}
        <Text style={styles.adviceText}>
          Please consult a doctor or specialist in our app for further evaluation.
        </Text>
        <TouchableOpacity style={styles.homeButton} onPress={goToHome}>
          <Text style={styles.buttonText}>Return to Homepage</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {result ? renderResult() : renderQuestion()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  conditionSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  conditionButton: {
    backgroundColor: '#4A969B',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  selectedConditionButton: {
    backgroundColor: '#2E6366', // Darker shade for selected state
  },
  conditionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  conditionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  questionText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  answerButton: {
    backgroundColor: '#4A969B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
  },
  homeButton: {
    backgroundColor: '#4A969B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 10,
  },
  text: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultDetails: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  resultConditionText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444',
  },
  adviceText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
});

export default Questions;