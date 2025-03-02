import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import AnnonceDetails from './screens/AnnonceDetails';
import FavScreen from './screens/FavScreen';
import { Annonce } from './models/Annonce';


export type RootStackParamList = {
  "Liste des annonces": undefined;
  "Annonce": { annonce: Annonce };
  "Mes favoris": undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Liste des annonces"
         screenOptions={{
          headerTitleAlign: 'center',
        }}>
          <Stack.Screen name="Liste des annonces" component={HomeScreen} />
          <Stack.Screen name="Annonce" component={AnnonceDetails} />
          <Stack.Screen name="Mes favoris" component={FavScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
