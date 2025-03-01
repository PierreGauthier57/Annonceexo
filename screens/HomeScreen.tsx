import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import AnnonceList from '../components/AnnonceList';
import { getAnnonces, Annonce } from '../models/Annonce';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BetterButton from '../components/utils/BetterButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Liste des annonces'>;

function HomeScreen() {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const nbFav = useSelector((state: RootState) => state.favoris.favorites.length);

  const fetchAnnonces = useCallback(async () => {
    try {
      const data = await getAnnonces();
      setAnnonces(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching annonces:', err);
      setError('Failed to load annonces. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnonces();
  }, [fetchAnnonces]);

  const handlePressAnnonce = useCallback(
    (annonce: Annonce) => {
      navigation.navigate('Annonce', { annonce: annonce });
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
          onPress={fetchAnnonces}
          buttonStyle={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BetterButton
        text={`Mes favoris (${nbFav})`}
        onPress={() => navigation.navigate('Mes favoris')}
        buttonStyle={styles.button}
      />
      <View style={styles.listContainer}>
        <AnnonceList annonces={annonces} onPressAnnonce={handlePressAnnonce} />
      </View>
    </View>
  );
}

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
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
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
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
});

export default HomeScreen;