import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../globalState/favoritesSlice';
import { RootState } from '../store';
import type { StaticScreenProps } from '@react-navigation/native';
import { Film } from '../models/Film';
import BetterButton from '../components/utils/BetterButton';

type MovieDetailsProps = StaticScreenProps<{
  film: Film;
}>;

function MovieDetails(props: MovieDetailsProps) {
  const { film } = props.route.params;

  const dispatch = useDispatch();
  
  const isFavorite = useSelector((state: RootState) =>
    state.favoris.favorites.find((fav) => fav.id === film.id)
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{film.model}</Text>
        <Text style={styles.title}>INFORMATION: </Text>
        <Text style={styles.price}>Prix: {film.price} €</Text>
        <Text style={styles.os}>OS: {film.os}</Text>
        <Text style={styles.constructor}>Marque: {film.constructor}</Text>
        <Text style={styles.releaseDate}>Année sortie: {film.releaseDate}</Text>
        <Text style={styles.title}>Vendeur: </Text>
        <View style={styles.sellerContainer}>
          <Image
            source={{ uri: film.salerAvatar }}
            style={styles.poster}
          />
          <View style={styles.vendeurInfo}>
            <Text style={styles.salerGender}>Genre: {film.salerGender}</Text>
            <Text style={styles.salerCity}>Ville: {film.salerCity}</Text>
            <Text style={styles.salerCountry}>Pays: {film.salerCountry}</Text>
            <Text style={styles.phone}>Téléphone: {film.phone}</Text>
          </View>
        </View>
        <Text style={styles.description}>{film.description}</Text>

        {isFavorite ? (
          <BetterButton 
            text="dislike !" 
            onPress={() => dispatch(removeFav(film.id))}
            buttonStyle={styles.removeButton}
          />
        ) : (
          <BetterButton 
            text="like !" 
            onPress={() => dispatch(addFav(film))} 
            buttonStyle={styles.addButton}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  constructor: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  os: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  saler: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  vendeurInfo: {
    flex: 1,
  },
  salerGender: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  salerCity: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  salerCountry: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: "lightcoral",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default MovieDetails;