import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Film } from '../models/Film';

interface MovieListProps {
  films: Film[];
  onPressFilm: (film: Film) => void;
}

type ItemProps = {
  film: Film;
  onPressFilm: (film: Film) => void;
};

const Item = ({ film, onPressFilm }: ItemProps) => (
  <TouchableOpacity onPress={() => onPressFilm(film)}>
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: film.salerAvatar }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{film.model}</Text>
        <Text>{film.constructor}</Text>
        <Text>{film.os}</Text>
        <Text>{film.releaseDate}</Text>
        <Text>{film.saler}</Text>
        <Text>{film.description}</Text>
        <Text>{film.salerGender}</Text>
        <Text>{film.salerCity}</Text>
        <Text>{film.salerCountry}</Text>
        <Text>{film.phone}</Text>
        <Text>{film.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

function MovieList({ films, onPressFilm }: MovieListProps) {
  return (
    <FlatList
      data={films}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Item film={item} onPressFilm={onPressFilm} />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#grey',
    padding: 10,
    borderRadius: 8,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default MovieList;