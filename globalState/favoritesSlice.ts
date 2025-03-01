import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from '../models/Film';

interface FavoritesState {
  favorites: Film[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<Film>) => {
      if (!state.favorites.find((film) => film.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFav: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((movie) => movie.id !== action.payload.toString());
    },
  },
});

export const { addFav, removeFav } = favoritesSlice.actions;
export default favoritesSlice.reducer;
