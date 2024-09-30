import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postWatchHistory = createAsyncThunk('/watchhistory/postWatchHistory', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.watchHistory, body);
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
    name: 'watchHistory',
    initialState: {
        errorMessage: '',
        successMessage: '',
        watchHistorySuccessMessage: '',
        watchHistoryErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postWatchHistory.pending, (state) => {
                state.isLoading = true;
                state.watchHistoryErrorMessage = '';
                state.watchHistorySuccessMessage = '';
            })
            .addCase(postWatchHistory.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.watchHistoryErrorMessage = payload?.message;
                state.watchHistorySuccessMessage = '';
            })
            .addCase(postWatchHistory.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.watchHistoryErrorMessage = '';
                state.watchHistorySuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.watchHistoryErrorMessage = '';
                state.watchHistorySuccessMessage = '';
            });
    },
});

export default slice.reducer;
