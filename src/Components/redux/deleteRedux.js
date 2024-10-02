import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const deleteResetMsg = createAction('resetMsg');

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (movie_id, { rejectWithValue }) => {
    try {
        const response = await apiGateway.delete(`${serviceEndpoints.deleteMovie}/${movie_id}`);
        const { success, message } = response?.data;
        if (success) {
            return response?.data;
        }
        if (response?.status !== 400) {
            Notification(message,'error')
            return rejectWithValue(message)}
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'deleteMovie',
    initialState: {
        errorMessage: '',
        successMessage: '',
        deleteMovieSuccessMessage: '',
        deleteMovieErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(deleteMovie.pending, (state) => {
                state.isLoading = true;
                state.deleteMovieErrorMessage = '';
                state.deleteMovieSuccessMessage = '';
            })
            .addCase(deleteMovie.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.deleteMovieErrorMessage = payload?.message;
                state.deleteMovieSuccessMessage = '';
            })
            .addCase(deleteMovie.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.deleteMovieErrorMessage = '';
                state.deleteMovieSuccessMessage = payload?.message;
            })
            .addCase(deleteResetMsg, (state) => {
                state.deleteMovieErrorMessage = '';
                state.deleteMovieSuccessMessage = '';
            });
    },
});

export default slice.reducer;
