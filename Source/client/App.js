import * as React from 'react';
import "./ignoreWarnings";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationRouteContainer from './route/NavigationRouteContainer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationRouteContainer Stack={Stack} />
  );
}

export default App;