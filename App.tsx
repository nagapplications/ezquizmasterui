import React, { useState } from 'react';
import { Modal } from 'react-native';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

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
    <ScrollView contentContainerStyle={styles.sidebarContainer} showsVerticalScrollIndicator>
      <Text style={styles.sidebarLabel}>{label}</Text>
      {displayItems.map((num) => (
        <View key={num} style={styles.tile}>
          <Text style={styles.tileText}>{num}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default function App() {
  const questionNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
  const scores = Array.from({ length: 15 }, (_, i) => i + 1);
  const [selectedLifeline, setSelectedLifeline] = useState<null | { label: string; description: string }>(null);
  const [selectedOption, setSelectedOption] = useState<null | { label: string; description: string }>(null);



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

        {/* Center Content */}
        <View style={styles.center}>
          <View style={styles.lifelines}>
            {lifelines.map((lifeline, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.lifelineButton}
                  onPress={() => setSelectedLifeline(lifeline)}
                >
                  <Text>{lifeline.icon}</Text>
                </TouchableOpacity>
              );
            })}

          </View>

          <View style={styles.questionBox}>
            <Text style={styles.questionText}>What is the capital of France?</Text>
          </View>

          <View style={styles.options}>
            {['Paris', 'London', 'Berlin', 'Madrid'].map((opt, i) => (
              <TouchableOpacity key={i} style={styles.optionButton} onPress={() => setSelectedOption({ label: opt, description: 'You selected ' + opt })}>
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


      {selectedLifeline && (
        <Modal transparent={true} animationType="fade" visible={true}>
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
                    // handle lifeline use
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
      {selectedOption && (
        <Modal transparent={true} animationType="fade" visible={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Confirm Answer</Text>
              <Text style={styles.modalDescription}>
                Are you sure you want to submit this answer, or would you like to rethink or use a lifeline?
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setSelectedOption(null)} // Close modal
                >
                  <Text style={styles.modalButtonText}>Rethink</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalUse}
                  onPress={() => {
                    // Add your submission logic here
                    console.log('Submitted answer:', selectedOption);
                    setSelectedOption(null); // Close modal
                  }}
                >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
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
    width: 50,
    height: 50,
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
