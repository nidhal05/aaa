import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import App from './App';

// Ignorer les avertissements spécifiques
LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core',
  'Setting a timer for a long period of time'
]);

registerRootComponent(App);