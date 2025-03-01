import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.releaseDate}>Date de sortie: {film.release_date}</Text>
      <Text style={styles.vote}>Note: {film.vote_average}/10</Text>
      <Text style={styles.overview}>{film.overview}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#grey',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  releaseDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  vote: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    backgroundColor: "lightgreen",
  },
  removeButton: {
    backgroundColor: "lightred",
  },
});

export default MovieDetails;
