import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PredictionCard = ({ prediction, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.date}>{prediction.date}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Résultat:</Text>
        <Text style={[styles.value, prediction.result.includes('PAS de maladie') ? styles.normal : styles.abnormal]}>
          {prediction.result}
        </Text>
      </View>
      {prediction.diagnostic && (
        <View style={styles.row}>
          <Text style={styles.label}>Diagnostic:</Text>
          <Text style={styles.value}>{prediction.diagnostic}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  value: {
    fontWeight: '600',
    fontSize: 14,
  },
  normal: {
    color: '#34A853',
  },
  abnormal: {
    color: '#EA4335',
  },
});

export default PredictionCard;