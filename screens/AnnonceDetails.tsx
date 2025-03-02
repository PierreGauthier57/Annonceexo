import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../globalState/favoritesSlice';
import { RootState } from '../store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Annonce } from '../models/Annonce';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  "Liste des annonces": undefined;
  "Annonce": { annonce: Annonce };
  "Mes favoris": undefined;
};

type MovieDetailsProps = NativeStackScreenProps<RootStackParamList, 'Annonce'>;

function AnnonceDetails({ route }: MovieDetailsProps) {
  const { annonce: annonce } = route.params;
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    !!state.favoris.favorites.find((fav) => fav.id === annonce.id)
  );

  const [liked, setLiked] = useState<boolean>(isFavorite);
  const [hearts, setHearts] = useState<number[]>([]);

  const handleLike = () => {
    if (liked) {
      dispatch(removeFav(annonce.id));
    } else {
      dispatch(addFav(annonce));
      setHearts([...hearts, ...Array(5).fill(0).map((_, i) => hearts.length + i)]);
      setTimeout(() => {
        setHearts((hearts) => hearts.slice(5));
      }, 1000);
    }
    setLiked(!liked);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{annonce.model}</Text>
        <Text style={styles.title}>INFORMATION: </Text>
        <Text style={styles.price}>Prix: {annonce.price} €</Text>
        <Text style={styles.os}>OS: {annonce.os}</Text>
        <Text style={styles.constructor}>Marque: {annonce.constructor}</Text>
        <Text style={styles.releaseDate}>Année sortie: {annonce.releaseDate}</Text>
        <Text style={styles.title}>Vendeur: </Text>
        <View style={styles.sellerContainer}>
          <Image
            source={{ uri: annonce.salerAvatar }}
            style={styles.poster}
          />
          <View style={styles.vendeurInfo}>
            <Text style={styles.salerGender}>Genre: {annonce.salerGender}</Text>
            <Text style={styles.salerCity}>Ville: {annonce.salerCity}</Text>
            <Text style={styles.salerCountry}>Pays: {annonce.salerCountry}</Text>
            <Text style={styles.phone}>Téléphone: {annonce.phone}</Text>
          </View>
        </View>
        <Text style={styles.description}>{annonce.description}</Text>

        <View style={styles.likeButtonContainer}>
          <TouchableOpacity onPress={handleLike}>
            <Animatable.View animation={liked ? 'bounceIn' : undefined}>
              <Icon
                name={liked ? 'heart' : 'heart-o'}
                size={30}
                color={liked ? 'red' : 'gray'}
                style={styles.likeButton}
              />
            </Animatable.View>
          </TouchableOpacity>

          {hearts.map((_, index) => (
            <Animatable.View
              key={index}
              animation="fadeOutUp"
              duration={1000}
              style={[styles.heartContainer, { left: Math.random() * 50 - 25, top: Math.random() * 50 - 25 }]}
            >
              <Icon name="heart" size={30} color="red" />
            </Animatable.View>
          ))}
        </View>
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
  likeButtonContainer: {
    position: 'relative',
    alignItems: 'center',
    height: 100, 
  },
  likeButton: {
    marginTop: 10,
  },
  heartContainer: {
    position: 'absolute',
    bottom: 0,
  },
});

export default AnnonceDetails;