import { NavigationContainer } from '@react-navigation/native'; // Add this import
import React from 'react';
import { AuthProvider } from './src/services/auth';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}