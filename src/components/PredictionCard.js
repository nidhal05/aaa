import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PredictionCard = ({ prediction }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{prediction.date}</Text>
      <Text>Résultat: {prediction.result}</Text>
      <Text>Confiance: {prediction.confidence}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});

export default PredictionCard;  