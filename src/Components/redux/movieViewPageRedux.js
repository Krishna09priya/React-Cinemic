import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const getMovieView = createAsyncThunk('movies/getMovieView', async (movie_id, { rejectWithValue }) => {
    try {
        const response = await apiGateway.get(`${serviceEndpoints.movieView}/${movie_id}`);
        const { success, message } = response?.data;
        if (success) {
            return response?.data?.data;
        }
        if (response?.status !== 400) {
            Notification(message,'error')
            return rejectWithValue(message)}
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'movieView',
    initialState: {
        errorMessage: '',
        successMessage: '',
        movieViewSuccessMessage: '',
        movieViewErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        movie:null
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMovieView.pending, (state) => {
                state.isLoading = true;
                state.movieViewErrorMessage = '';
                state.movieViewSuccessMessage = '';
            })
            .addCase(getMovieView.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.movieViewErrorMessage = payload?.message;
                state.movieViewSuccessMessage = '';
            })
            .addCase(getMovieView.fulfilled, (state, { payload }) => {
                state.movie = payload || null;
                state.isLoading = false;
                state.movieViewErrorMessage = '';
                state.movieViewSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.movieViewErrorMessage = '';
                state.movieViewSuccessMessage = '';
            });
    },
});

export default slice.reducer;
