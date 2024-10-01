import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';
import { getQueryParams } from '../../utils/queryParams';

export const resetMsg = createAction('resetMsg');

export const getWatchlater = createAsyncThunk('/getWatchlater', async (currentPage,{ rejectWithValue }) => {
    try {
        const response = await apiGateway.get(`${serviceEndpoints.getWatchLater}?${getQueryParams({ page: currentPage })}`);
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
    name: 'getWatchlater',
    initialState: {
        errorMessage: '',
        successMessage: '',
        getWatchlaterSuccessMessage: '',
        getWatchlaterErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        watchlaterlist:[]
    },

    extraReducers: (builder) => {
        builder
            .addCase(getWatchlater.pending, (state) => {
                state.isLoading = true;
                state.getWatchlaterErrorMessage = '';
                state.getWatchlaterSuccessMessage = '';
            })
            .addCase(getWatchlater.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.getWatchlaterErrorMessage = payload?.message ;
                state.getWatchlaterSuccessMessage = '';
            })
            .addCase(getWatchlater.fulfilled, (state, { payload }) => {
                state.watchlaterlist = payload || null;
                state.isLoading = false;
                state.getWatchlaterErrorMessage = '';
                state.getWatchlaterSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.getWatchlaterErrorMessage = '';
                state.getWatchlaterSuccessMessage = '';
            });
    },
});

export default slice.reducer;
