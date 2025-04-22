import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../services/auth';

const Dashboard = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue {user?.email}</Text>
      <Text>Tableau de bord utilisateur</Text>
      <Button
        title="Voir les prédictions ECG"
        onPress={() => navigation.navigate('Predictions')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});

export default Dashboard;