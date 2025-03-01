import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MovieDetails from './screens/FilmDetails';
import FavScreen from './screens/FavScreen';
import { Film } from './models/Film';


export type RootStackParamList = {
  Home: undefined;
  Details: { film: Movie };
  Favoris: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={MovieDetails} />
          <Stack.Screen name="Favoris" component={FavScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
