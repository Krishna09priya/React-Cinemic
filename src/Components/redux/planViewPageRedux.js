import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const getPlanView = createAsyncThunk('plans/getPlanView', async (plan_id, { rejectWithValue }) => {
    try {
        const response = await apiGateway.get(`${serviceEndpoints.planView}/${plan_id}`);
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
    name: 'planView',
    initialState: {
        errorMessage: '',
        successMessage: '',
        planViewSuccessMessage: '',
        planViewErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        plan:null
    },

    extraReducers: (builder) => {
        builder
            .addCase(getPlanView.pending, (state) => {
                state.isLoading = true;
                state.planViewErrorMessage = '';
                state.planViewSuccessMessage = '';
            })
            .addCase(getPlanView.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.planViewErrorMessage = payload?.message;
                state.planViewSuccessMessage = '';
            })
            .addCase(getPlanView.fulfilled, (state, { payload }) => {
                state.plan = payload || null;
                state.isLoading = false;
                state.planViewErrorMessage = '';
                state.planViewSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.planViewErrorMessage = '';
                state.planViewSuccessMessage = '';
            });
    },
});

export default slice.reducer;
