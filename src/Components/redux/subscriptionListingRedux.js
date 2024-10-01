import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';
import { getQueryParams } from '../../utils/queryParams';

export const resetMsg = createAction('resetMsg');

export const getPlanList = createAsyncThunk('/getPlanlist', async (data,{ rejectWithValue }) => {
    try {
        const{...currentPage}=data
        const response = await apiGateway.get(`${serviceEndpoints.planlist}?${getQueryParams(currentPage)}`);
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
    name: 'plans',
    initialState: {
        errorMessage: '',
        successMessage: '',
        planListSuccessMessage: '',
        planListErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        planlist:[]
    },

    extraReducers: (builder) => {
        builder
            .addCase(getPlanList.pending, (state) => {
                state.isLoading = true;
                state.planListErrorMessage = '';
                state.planListSuccessMessage = '';
            })
            .addCase(getPlanList.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.planListErrorMessage = payload?.message ;
                state.planListSuccessMessage = '';
            })
            .addCase(getPlanList.fulfilled, (state, { payload }) => {
                state.planlist =payload || null;
                state.isLoading = false;
                state.planListErrorMessage = '';
                state.planListSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.planListErrorMessage = '';
                state.planListSuccessMessage = '';
            });
    },
});

export default slice.reducer;
