import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../services/auth';
import AuthNavigator from './AuthNavigator';
import Dashboard from '../screens/User/Dashboard';
import PredictionScreen from '../screens/User/PredictionScreen';
import AdminDashboard from '../screens/Admin/AdminDashboard';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'Tableau de bord' }}
          />
          <Stack.Screen
            name="PredictionScreen"
            component={PredictionScreen}
            options={{ title: 'Prédictions' }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{ title: 'Admin Dashboard' }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}