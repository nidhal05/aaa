import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../services/auth';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Administrateur</Text>
      <Text>Connecté en tant que : {user?.email}</Text>
      <Text>Fonctionnalités admin à implémenter ici</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
});

export default AdminDashboard;