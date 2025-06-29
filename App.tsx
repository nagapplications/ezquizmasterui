import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Sidebar = ({
  items,
  reverseOrder = false,
}: {
  items: number[];
  reverseOrder?: boolean;
}) => {
  const displayItems = reverseOrder ? [...items].reverse() : items;

  return (
    <ScrollView contentContainerStyle={styles.sidebarContainer} showsVerticalScrollIndicator>
      <Text>Score</Text>
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
  const scores = Array.from({ length: 15 }, (_, i) => i + 1); // will reverse

  return (
    <View style={styles.container}>
      {/* Left sidebar: Questions 1–15 */}
      <View style={styles.sidebar}>
      
        <Sidebar items={questionNumbers} />
      </View>

      {/* Center content */}
      <View style={styles.center}>
        <View style={styles.lifelines}>
          {['💡', '⏳', '📞'].map((symbol, i) => (
            <TouchableOpacity key={i} style={styles.lifelineButton}>
              <Text>{symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>What is the capital of France?</Text>
        </View>
        <View style={styles.options}>
          {['Paris', 'London', 'Berlin', 'Madrid'].map((opt, i) => (
            <TouchableOpacity key={i} style={styles.optionButton}>
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Right sidebar: Scores 15–1 */}
      <View style={styles.sidebar}>
        <Sidebar items={scores} reverseOrder />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebar: {
    width: 50,
    backgroundColor: '#f7f7f7',
  },
  sidebarContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  tile: {
    width: 40,
    height: 40,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  tileText: { fontSize: 16, fontWeight: 'bold' },
  center: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  lifelines: { flexDirection: 'row', marginBottom: 20 },
  lifelineButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  questionBox: { marginBottom: 20 },
  questionText: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  options: { width: '100%' },
  optionButton: {
    backgroundColor: '#2196f3',
    padding: 12,
    marginVertical: 6,
    borderRadius: 5,
  },
  optionText: { color: '#fff', textAlign: 'center' },
});
