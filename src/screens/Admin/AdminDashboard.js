// AdminDashboard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../services/auth';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Administrateur</Text>
      <Text style={styles.userInfo}>Connecté en tant que : {user?.email}</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statistiques</Text>
        <Text>Nombre d'utilisateurs : 42</Text>
        <Text>Prédictions aujourd'hui : 15</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    marginTop: 20
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    color: '#444'
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  logoutButton: {
    backgroundColor: '#EA4335'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default AdminDashboard;