import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';
import { getQueryParams } from '../../utils/queryParams';


export const resetMsg = createAction('resetMsg');

export const getStatus = createAsyncThunk('/getStatus', async (currentPage, { rejectWithValue }) => {
    try {
        const response = await apiGateway.get(`${serviceEndpoints.subscriptionStatus}?${getQueryParams({ page: currentPage })}`);
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
    name: 'status',
    initialState: {
        errorMessage: '',
        successMessage: '',
        statusSuccessMessage: '',
        statusErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        planlist:[]
    },

    extraReducers: (builder) => {
        builder
            .addCase(getStatus.pending, (state) => {
                state.isLoading = true;
                state.statusErrorMessage = '';
                state.statusSuccessMessage = '';
            })
            .addCase(getStatus.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.statusErrorMessage = payload?.message ;
                state.statusSuccessMessage = '';
            })
            .addCase(getStatus.fulfilled, (state, { payload }) => {
                state.planlist =payload || null;
                state.isLoading = false;
                state.statusErrorMessage = '';
                state.statusSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.statusErrorMessage = '';
                state.statusSuccessMessage = '';
            });
    },
});

export default slice.reducer;
