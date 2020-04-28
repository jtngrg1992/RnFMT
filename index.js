/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RegisterComponent,
  LoginComponent,
  DashboardComponent,
} from './src/screens';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="Register" component={RegisterComponent} />
      <Stack.Screen name="Dashboard" component={DashboardComponent} />
    </Stack.Navigator>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => App);
