import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home';
import Scanner from './src/screens/Scanner';
import Food from './src/screens/Food';
import Meal from './src/screens/Meal';
import { FirebaseProvider } from './src/database/FirebaseProvider';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <FirebaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Food"
            component={Food}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Meal"
            component={Meal}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseProvider>
  );
}

export default App;
