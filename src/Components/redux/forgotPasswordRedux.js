import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postForgotPassword = createAsyncThunk('forgotPassword/postForgotPassword', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.forgotPassword, body);
        const { success, message } = response?.data;
        if (success) {
            return response?.data; // Assuming this contains user and accessToken
        }
        if (response?.status !== 400) {
            Notification(message,'error')
            return rejectWithValue(message);}
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'forgotPassword',
    initialState: {
        errorMessage: '',
        successMessage: '',
        forgotPasswordSuccessMessage: '',
        forgotPasswordErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postForgotPassword.pending, (state) => {
                state.isLoading = true;
                state.forgotPasswordErrorMessage = '';
                state.forgotPasswordSuccessMessage = '';
            })
            .addCase(postForgotPassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.forgotPasswordErrorMessage = payload?.message
                state.forgotPasswordSuccessMessage = '';
            })
            .addCase(postForgotPassword.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.forgotPasswordErrorMessage = '';
                state.forgotPasswordSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.forgotPasswordErrorMessage = '';
                state.forgotPasswordSuccessMessage = '';
            });
    },
});

export default slice.reducer;
