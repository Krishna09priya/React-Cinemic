import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';
import { getQueryParams } from '../../utils/queryParams';

export const resetMsg = createAction('resetMsg');

export const getWatchHistory = createAsyncThunk('/getWatchHistory', async (currentPage,{ rejectWithValue }) => {
    try {
        const response = await apiGateway.get(`${serviceEndpoints.getWatchHistory}?${getQueryParams({ page: currentPage })}`);
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
    name: 'getWatchHistory',
    initialState: {
        errorMessage: '',
        successMessage: '',
        getWatchHistorySuccessMessage: '',
        getWatchHistoryErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        watchHistorylist:[]
    },

    extraReducers: (builder) => {
        builder
            .addCase(getWatchHistory.pending, (state) => {
                state.isLoading = true;
                state.getWatchHistoryErrorMessage = '';
                state.getWatchHistorySuccessMessage = '';
            })
            .addCase(getWatchHistory.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.getWatchHistoryErrorMessage = payload?.message ;
                state.getWatchHistorySuccessMessage = '';
            })
            .addCase(getWatchHistory.fulfilled, (state, { payload }) => {
                state.watchHistorylist = payload || null;
                state.isLoading = false;
                state.getWatchHistoryErrorMessage = '';
                state.getWatchHistorySuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.getWatchHistoryErrorMessage = '';
                state.getWatchHistorySuccessMessage = '';
            });
    },
});

export default slice.reducer;
