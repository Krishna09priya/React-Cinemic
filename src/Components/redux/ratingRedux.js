import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const ratingResetMsg = createAction('resetMsg');

export const postRating = createAsyncThunk('/rating/postRating', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.rating, body);
        const { success, message } = response.data;
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
    name: 'rating',
    initialState: {
        errorMessage: '',
        successMessage: '',
        ratingSuccessMessage: '',
        ratingErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postRating.pending, (state) => {
                state.isLoading = true;
                state.ratingErrorMessage = '';
                state.ratingSuccessMessage = '';
            })
            .addCase(postRating.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.ratingErrorMessage = payload?.message;
                state.ratingSuccessMessage = '';
            })
            .addCase(postRating.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.ratingErrorMessage = '';
                state.ratingSuccessMessage = payload?.message;
            })
            .addCase(ratingResetMsg, (state) => {
                state.ratingErrorMessage = '';
                state.ratingSuccessMessage = '';
            });
    },
});

export default slice.reducer;
