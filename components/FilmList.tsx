import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Film } from '../models/Film';
import { Ionicons } from '@expo/vector-icons'; 

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
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(films);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (text: string) => {
    setSearch(text);
    filterFilms(text, minPrice, maxPrice);
  };

  const handleMinPriceChange = (text: string) => {
    setMinPrice(text);
    filterFilms(search, text, maxPrice);
  };

  const handleMaxPriceChange = (text: string) => {
    setMaxPrice(text);
    filterFilms(search, minPrice, text);
  };

  const filterFilms = (searchText: string, minPrice: string, maxPrice: string) => {
    const filtered = films.filter(film => {
      const matchesSearch = film.model.toLowerCase().includes(searchText.toLowerCase());
      const matchesMinPrice = minPrice === '' || film.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || film.price <= parseFloat(maxPrice);
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredFilms(filtered);
  };

  const clearSearch = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setFilteredFilms(films);
  };

  const sortFilmsByPrice = () => {
    const sorted = [...filteredFilms].sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    setFilteredFilms(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.toggleButton}>
        <Ionicons name={showFilters ? "chevron-up" : "chevron-down"} size={24} color="gray" />
      </TouchableOpacity>
      {showFilters && (
        <View>
          <View style={styles.priceContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Prix min"
              value={minPrice}
              onChangeText={handleMinPriceChange}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.priceInput}
              placeholder="Prix max"
              value={maxPrice}
              onChangeText={handleMaxPriceChange}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity onPress={sortFilmsByPrice} style={styles.sortButton}>
            <Text style={styles.sortButtonText}>
              Trier par prix {sortOrder === 'asc' ? 'croissant' : 'décroissant'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  toggleButton: {
    alignItems: 'center',
    marginBottom: 10,
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  sortButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
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