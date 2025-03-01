import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Film } from '../models/Film';
import { Ionicons } from '@expo/vector-icons'; // Assurez-vous d'avoir installé @expo/vector-icons

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
      <View style={styles.info}>
        <Text style={styles.title}>{film.model}</Text>
        <Text>{film.releaseDate + " - " + film.price + "€"}</Text>
        <Text>{film.description}</Text>
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

  const clearSearch = () => {
    setSearch('');
    setFilteredFilms(films);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher par titre..."
          value={search}
          onChangeText={handleSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.announcementCount}>
        {filteredFilms.length} annonces disponibles
      </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  announcementCount: {
    fontSize: 16,
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