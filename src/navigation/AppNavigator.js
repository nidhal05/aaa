import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../services/auth';
import AuthNavigator from './AuthNavigator';
import Dashboard from '../screens/User/Dashboard';
import AdminDashboard from '../screens/Admin/AdminDashboard';
import PredictionScreen from '../screens/User/PredictionScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        user.email === 'admin@example.com' ? (
          <Stack.Screen name="Admin" component={AdminDashboard} />
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Predictions" component={PredictionScreen} />
          </>
        )
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}