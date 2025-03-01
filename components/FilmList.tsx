import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
  const [search, setSearch] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(films);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = films.filter(film => film.model.toLowerCase().includes(text.toLowerCase()));
    setFilteredFilms(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher par titre..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredFilms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item film={item} onPressFilm={onPressFilm} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
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