import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MovieList from '../components/FilmList';
import { getFilms, Film } from '../models/Film';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BetterButton from '../components/utils/BetterButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Liste des annonces'>;

function HomeScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const nbFav = useSelector((state: RootState) => state.favoris.favorites.length);

  const fetchFilms = useCallback(async () => {
    try {
      const data = await getFilms();
      setFilms(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching films:', err);
      setError('Failed to load films. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const handlePressFilm = useCallback(
    (film: Film) => {
      navigation.navigate('Details', { movie: film });
    },
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <BetterButton
          text="Retry"
          onPress={fetchFilms}
          buttonStyle={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BetterButton
        text={`Mes favoris : ${nbFav}`}
        onPress={() => navigation.navigate('Mes favoris')}
        buttonStyle={styles.button}
      />
      <View style={styles.listContainer}>
        <MovieList films={films} onPressFilm={handlePressFilm} />
      </View>
    </View>
  );
}

// Styles
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
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 52,
    alignItems: 'center',
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'lightred',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
});

export default HomeScreen;