import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nom: '',
  prenom: '',
  pseudo: '',
  email: '',
  couleur: '',
  admin: false,
  authentifie: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      return { ...state, ...action.payload, authentifie: true };
    },
    logout(state) {
      return initialState;
    },
    changeColor(state, action) {
      state.couleur = action.payload;
    },
  },
});

export const { login, logout, changeColor } = userSlice.actions;
export default userSlice.reducer;
