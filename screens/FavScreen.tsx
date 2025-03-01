import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { Annonce } from '../models/Film';
import AnnonceList from '../components/FilmList';

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Mes favoris'>;

function FavScreen() {

  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const favorites = useSelector((state: RootState) => state.favoris.favorites);

  return (
    <View style={styles.container}>
      <AnnonceList
        annonces={favorites}
        onPressAnnonce={(annonce: Annonce) => navigation.navigate('Annonce', { annonce: annonce })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default FavScreen;
