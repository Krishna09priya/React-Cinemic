import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const watchResetMsg = createAction('resetMsg');

export const postWatchlater = createAsyncThunk('/watchlater/postWatchlater', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.watchLater, body);
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
    name: 'watchLater',
    initialState: {
        errorMessage: '',
        successMessage: '',
        watchLaterSuccessMessage: '',
        watchLaterErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postWatchlater.pending, (state) => {
                state.isLoading = true;
                state.watchLaterErrorMessage = '';
                state.watchLaterSuccessMessage = '';
            })
            .addCase(postWatchlater.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.watchLaterErrorMessage = payload?.message;
                state.watchLaterSuccessMessage = '';
            })
            .addCase(postWatchlater.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.watchLaterErrorMessage = '';
                state.watchLaterSuccessMessage = payload?.message;
            })
            .addCase(watchResetMsg, (state) => {
                state.watchLaterErrorMessage = '';
                state.watchLaterSuccessMessage = '';
            });
    },
});

export default slice.reducer;
