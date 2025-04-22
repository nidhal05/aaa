import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { db } from '../../services/firestore';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import PredictionCard from '../../components/PredictionCard';
import { useAuth } from '../../services/auth';

export default function PredictionScreen() {
  const [predictions, setPredictions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'ecg_predictions'),
      where('userId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPredictions(data);
    });

    return unsubscribe;
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={predictions}
        renderItem={({ item }) => <PredictionCard prediction={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}