import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs';


export const fetchUserRequestsAsync = createAsyncThunk(
  'demands/fetchRequests',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data.requests; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const addDemandAsync = createAsyncThunk(
  'demands/addDemand',
  async ({ id, newDemand }, { rejectWithValue }) => {
    try {
 
      const response = await axios.get(`${API_URL}/${id}`);
      const updatedRequests = [...response.data.requests, newDemand];


      await axios.put(`${API_URL}/${id}`, { requests: updatedRequests });

 
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
          return { ...request, status: 'Annulée' };
        }
        return request; 
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
      const response = await axios.get(API_URL); 

  
      const users = response.data;


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


export const approveRequestAsync = createAsyncThunk(
  'demands/approveRequest',
  async ({ userId, requestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const updatedRequests = response.data.requests.map((request) => {
        if (request.id === requestId) {
          return { ...request, status: 'Approuvée' }; 
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

export const rejectRequestAsync = createAsyncThunk(
  'demands/rejectRequest',
  async ({ userId, requestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const updatedRequests = response.data.requests.map((request) => {
        if (request.id === requestId) {
          return { ...request, status: 'Rejetée' }; 
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

const demandSlice = createSlice({
  name: 'demands',
  initialState: {
    isLoading: false,
    error: null,
    requests: [], 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
    
      .addCase(fetchUserRequestsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserRequestsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      
        state.requests = action.payload;
      })

      .addCase(fetchUserRequestsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     
.addCase(cancelRequestAsync.fulfilled, (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.requests = action.payload; 
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
        state.requests = action.payload; 
      })
      .addCase(fetchUserRequestsAsyncAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })  

      .addCase(approveRequestAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.requests = action.payload;
      })
      .addCase(approveRequestAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(rejectRequestAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.requests = action.payload; 
      })
      .addCase(rejectRequestAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export default demandSlice.reducer;
