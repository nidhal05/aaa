import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../services/firestore';
import { ref, onValue } from 'firebase/database';
import PredictionCard from '../../components/PredictionCard';
import { useAuth } from '../../services/auth';
import ECGChart from '../../components/ECGChart';

export default function PredictionScreen({ navigation }) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log('Utilisateur dans PredictionScreen:', user);
    if (!user) {
      setError('Utilisateur non authentifié');
      setLoading(false);
      return;
    }

    const ecgDataRef = ref(db, 'ecg_data');
    const predictionsRef = ref(db, 'predictions');

    const unsubscribeEcgData = onValue(
      ecgDataRef,
      (ecgSnapshot) => {
        const ecgData = ecgSnapshot.val();
        if (!ecgData) {
          setError('Aucune donnée ECG disponible');
          setLoading(false);
          return;
        }

        const unsubscribePredictions = onValue(
          predictionsRef,
          (predSnapshot) => {
            const predData = predSnapshot.val();
            if (!predData) {
              setError('Aucune prédiction disponible');
              setLoading(false);
              return;
            }

            const mergedData = [];
            for (const key in ecgData) {
              if (predData[key]) {
                const timestamp = parseInt(key.split('-')[1], 36) * 1000;
                const formattedDate = new Date(timestamp).toLocaleString('fr-FR');

                mergedData.push({
                  id: key,
                  date: formattedDate,
                  ecgData: ecgData[key].ecg_values || [],
                  result: predData[key].message || 'Inconnu',
                  confidence: predData[key].confidence || 0,
                  diagnostic: ecgData[key].diagnostic || null,
                });
              }
            }

            mergedData.sort((a, b) => new Date(b.date) - new Date(a.date));

            setPredictions(mergedData);
            setLoading(false);
          },
          (err) => {
            console.error('Erreur lors de la récupération des prédictions:', err);
            setError('Erreur lors de la récupération des prédictions: ' + err.message);
            setLoading(false);
          }
        );

        return () => unsubscribePredictions();
      },
      (err) => {
        console.error('Erreur lors de la récupération des données ECG:', err);
        setError('Erreur lors de la récupération des données ECG: ' + err.message);
        setLoading(false);
      }
    );

    return () => unsubscribeEcgData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      // Réinitialiser la pile de navigation pour retourner à l'écran de connexion
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (predictions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune prédiction disponible</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>

      {selectedPrediction && (
        <View style={styles.chartContainer}>
          <ECGChart data={selectedPrediction.ecgData} />
        </View>
      )}

      <FlatList
        data={predictions}
        renderItem={({ item }) => (
          <PredictionCard
            prediction={item}
            onPress={() => setSelectedPrediction(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#EA4335',
    textAlign: 'center',
  },
  chartContainer: {
    padding: 15,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#EA4335',
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});