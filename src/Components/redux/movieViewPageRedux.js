import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const getMovieView = createAsyncThunk('movies/getMovieView', async (movieId, { rejectWithValue }) => {
    try {
        const response = await apiGateway.get(`${serviceEndpoints.movieView}/${movieId}`);
        const { success, message, movie } = response?.data?.data;
        console.log('rrrr',response?.data);
        console.log(success);
        console.log('movieee',movie);
        if (success) {
            return movie;
        }
        Notification(message,'error')
        return rejectWithValue(message);
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
        movie:{}
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
                state.movieViewErrorMessage = payload.message || 'Failed to fetch movie details' ;
                state.movieViewSuccessMessage = '';
            })
            .addCase(getMovieView.fulfilled, (state, { payload }) => {
                state.movie = payload || {};
                state.isLoading = false;
                state.movieViewErrorMessage = '';
                state.movieViewSuccessMessage = 'Movie details fetched successfully';
            })
            .addCase(resetMsg, (state) => {
                state.errorMessage = '';
                state.successMessage = '';
            });
    },
});

export default slice.reducer;
