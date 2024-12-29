import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de base de l'API MockAPI
const API_URL = 'https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs';

// Action asynchrone pour récupérer les demandes d'un utilisateur
export const fetchUserRequestsAsync = createAsyncThunk(
  'demands/fetchRequests',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data.requests; // Retourner les demandes de l'utilisateur
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action asynchrone pour ajouter une demande
export const addDemandAsync = createAsyncThunk(
  'demands/addDemand',
  async ({ id, newDemand }, { rejectWithValue }) => {
    try {
      // Récupérer l'utilisateur existant pour mettre à jour ses demandes
      const response = await axios.get(`${API_URL}/${id}`);
      const updatedRequests = [...response.data.requests, newDemand];

      // Mettre à jour les demandes de l'utilisateur
      await axios.put(`${API_URL}/${id}`, { requests: updatedRequests });

      // Retourner l'id de l'utilisateur et la nouvelle demande pour mettre à jour l'état
      return { id, updatedRequests };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const cancelRequestAsync = createAsyncThunk(
  'demands/cancelRequest',
  async ({ userId, requestId }, { rejectWithValue }) => {
    try {
      console.log(`Fetching requests for userId: ${userId}`);
      const response = await axios.get(`${API_URL}/${userId}`);
      console.log('Fetched requests:', response.data.requests);

      const updatedRequests = response.data.requests.map((request) => {
        if (request.id === requestId && request.status === 'En attente') {
          return { ...request, status: 'Annulée' }; // Annuler la demande
        }
        return request; // Laisser les autres demandes inchangées
      });

      console.log('Updated requests:', updatedRequests);

      await axios.put(`${API_URL}/${userId}`, { requests: updatedRequests });
      console.log('Requests updated successfully.');

      return updatedRequests;
    } catch (error) {
      console.error('Error cancelling request:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchUserRequestsAsyncAdmin = createAsyncThunk(
  'users/fetchUserRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL); // Remplacez par l'URL de votre API

      // Récupère toutes les demandes des utilisateurs
      const users = response.data;

      // Récupère toutes les demandes de tous les utilisateurs et inclut leur nom et prénom
      const allRequests = users.flatMap(user => 
        user.requests.map(request => ({
          ...request,
          userId: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
        }))
      );

      return allRequests;
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action asynchrone pour approuver une demande
export const approveRequestAsync = createAsyncThunk(
  'demands/approveRequest',
  async ({ userId, requestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const updatedRequests = response.data.requests.map((request) => {
        if (request.id === requestId) {
          return { ...request, status: 'Approuvée' }; // Mettre à jour le statut
        }
        return request;
      });

      await axios.put(`${API_URL}/${userId}`, { requests: updatedRequests });
      return updatedRequests;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action asynchrone pour rejeter une demande
export const rejectRequestAsync = createAsyncThunk(
  'demands/rejectRequest',
  async ({ userId, requestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const updatedRequests = response.data.requests.map((request) => {
        if (request.id === requestId) {
          return { ...request, status: 'Rejetée' }; // Mettre à jour le statut
        }
        return request;
      });

      await axios.put(`${API_URL}/${userId}`, { requests: updatedRequests });
      return updatedRequests;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice Redux
const demandSlice = createSlice({
  name: 'demands',
  initialState: {
    isLoading: false,
    error: null,
    requests: [], // Assurez-vous que `requests` est un tableau vide au départ
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      // Récupérer les demandes d'un utilisateur (en attente)
      .addCase(fetchUserRequestsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Récupérer les demandes d'un utilisateur (réussie)
      .addCase(fetchUserRequestsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Mettre à jour l'état avec les demandes récupérées
        state.requests = action.payload;
      })
      // Récupérer les demandes d'un utilisateur (échec)
      .addCase(fetchUserRequestsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Ajoutez ce bloc dans extraReducers
.addCase(cancelRequestAsync.fulfilled, (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.requests = action.payload; // Met à jour la liste des demandes
})
.addCase(cancelRequestAsync.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})

     
      .addCase(fetchUserRequestsAsyncAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserRequestsAsyncAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.requests = action.payload; // Enregistre toutes les demandes
      })
      .addCase(fetchUserRequestsAsyncAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })  

      .addCase(approveRequestAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.requests = action.payload; // Met à jour la liste des demandes
      })
      .addCase(approveRequestAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(rejectRequestAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.requests = action.payload; // Met à jour la liste des demandes
      })
      .addCase(rejectRequestAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export default demandSlice.reducer;
