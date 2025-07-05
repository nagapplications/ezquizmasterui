import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, Modal } from 'react-native';

import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
    clientId: '640364919747-oq0j62vjbisqo55iammafe2v8s26jlq6.apps.googleusercontent.com',
  redirectUrl: 'com.ezquizmasterui:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email'],
};

const signInWithGoogle = async () => {
  try {
    const result = await authorize(config);
    console.log('✅ SUCCESS: ', result);
  } catch (error) {
    console.log('❌ ERROR (Google Auth):', JSON.stringify(error, null, 2));
  }
};


async function loginWithGoogle() {
  try {
    const authState = await authorize(config);
    console.log('Access Token:', authState.accessToken);
    console.log('ID Token:', authState.idToken);

    // Call your Spring Boot backend with the token
    const response = await fetch('http://192.168.0.25:8080/ezquizmaster/api/quiz/start', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState.idToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.text();
    console.log('Quiz Started:', result);
  } catch (error) {
    console.error('OAuth2 Login Error', error);
  }
}



const lifelines = [
  {
    label: 'Alternate Question',
    icon: '🔁',
    description: 'This lifeline gives you an alternate question of the same difficulty level.',
  },
  {
    label: '50-50',
    icon: '🌗',
    description: 'This lifeline removes two incorrect options.',
  },
  {
    label: 'Second Chance',
    icon: '✌️',
    description: 'This lifeline gives you another chance if your first answer is wrong.',
  },
];

const Sidebar = ({
  label,
  items,
  reverseOrder = false,
}: {
  label: string;
  items: number[];
  reverseOrder?: boolean;
}) => {
  const displayItems = reverseOrder ? [...items].reverse() : items;

  return (
    <ScrollView contentContainerStyle={styles.sidebarContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.sidebarLabel}>{label}</Text>
      {displayItems.map((num) => (
        <View key={num} style={styles.tile}>
          <Text style={styles.tileText}>{num}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#3d3d5c',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    color: '#f5f5f5',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Next' : 'sans-serif-medium',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 60,
    backgroundColor: '#ececec',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  sidebarLabel: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: -5,
    color: '#34495e',
  },
  tile: {
    width: 40,
    height: 40,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
    borderRadius: 6,
  },
  tileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  center: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lifelines: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  lifelineButton: {
    marginHorizontal: 10,
    padding: 12,
    backgroundColor: '#7f8c8d',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionBox: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2d3436',
  },
  options: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#6c5ce7',
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 14,
    backgroundColor: '#3d3d5c',
    alignItems: 'center',
  },
  footerText: {
    color: '#ecf0f1',
    fontSize: 12,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 10,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#2c3e50',
  },
  modalDescription: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancel: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#34495e',
    borderRadius: 5,
  },
  modalUse: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#8e44ad',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

});

export default function App() {
  const questionNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
  const scores = Array.from({ length: 15 }, (_, i) => i + 1);

  const [selectedLifeline, setSelectedLifeline] = useState<null | { label: string; description: string }>(null);
  const [selectedOption, setSelectedOption] = useState<null | { label: string; description: string }>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);





  const fetchQuestion = async (index: number) => {
    try {
      const response = await fetch(`http://localhost:8080/ezquizmaster/api/quiz/getQuestion?number=${index + 1}`);
      if (!response.ok) throw new Error('Failed to fetch question');

      const questionData = await response.json();
      setCurrentQuestion(questionData);
      setQuestionIndex(index);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load question');
    }
  };

  useEffect(() => {
    signInWithGoogle();
  }, []);

  const handleAnswerSubmit = () => {
    console.log('Submitted answer:', selectedOption);
    setSelectedOption(null);

    if (questionIndex + 1 < 15) {
      fetchQuestion(questionIndex + 1);
    } else {
      Alert.alert('Quiz Completed', 'You have finished all questions!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ez Quiz Master</Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <Sidebar label="Qnos" items={questionNumbers} />
        </View>

        {/* Center */}
        <View style={styles.center}>
          {/* Lifelines */}
          <View style={styles.lifelines}>
            {lifelines.map((lifeline, i) => (
              <TouchableOpacity
                key={i}
                style={styles.lifelineButton}
                onPress={() => setSelectedLifeline(lifeline)}
              >
                <Text>{lifeline.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Question */}
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {currentQuestion ? currentQuestion.questionText : 'Loading question...'}
            </Text>
          </View>

          {/* Options */}
          <View style={styles.options}>
            {currentQuestion?.options?.map((opt: string, i: number) => (
              <TouchableOpacity
                key={i}
                style={styles.optionButton}
                onPress={() =>
                  setSelectedOption({ label: opt, description: 'You selected ' + opt })
                }
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Right Sidebar */}
        <View style={styles.sidebar}>
          <Sidebar label="Scores" items={scores} reverseOrder />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 ez Quiz Master. All rights reserved.</Text>
      </View>

      {/* Lifeline Modal */}
      {selectedLifeline && (
        <Modal transparent animationType="fade" visible>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>{selectedLifeline.label}</Text>
              <Text style={styles.modalDescription}>{selectedLifeline.description}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setSelectedLifeline(null)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalUse}
                  onPress={() => {
                    // Implement lifeline logic
                    setSelectedLifeline(null);
                  }}
                >
                  <Text style={styles.modalButtonText}>Use '{selectedLifeline.label}'</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Option Confirmation Modal */}
      {selectedOption && (
        <Modal transparent animationType="fade" visible>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Confirm Answer</Text>
              <Text style={styles.modalDescription}>
                Are you sure you want to submit this answer, or would you like to rethink or use a lifeline?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setSelectedOption(null)}>
                  <Text style={styles.modalButtonText}>Rethink</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalUse} onPress={handleAnswerSubmit}>
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
