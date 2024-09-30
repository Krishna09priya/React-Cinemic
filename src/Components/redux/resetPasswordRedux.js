import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postResetPassword = createAsyncThunk('resetPassword/postResetPassword', async (data, { rejectWithValue }) => {
    const {token,password} = data
    try {
        const response = await apiGateway.post(`${serviceEndpoints.resetPassword}/${token}`,{password});
        const { success, message } = response?.data;
        if (success) {
            return response?.data ;
        }
        if (response?.status !== 400) {
            Notification(message,'error')
            return rejectWithValue(message);}
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'resetPassword',
    initialState: {
        errorMessage: '',
        successMessage: '',
        resetPasswordSuccessMessage: '',
        resetPasswordErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postResetPassword.pending, (state) => {
                state.isLoading = true;
                state.resetPasswordErrorMessage = '';
                state.resetPasswordSuccessMessage = '';
            })
            .addCase(postResetPassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.resetPasswordErrorMessage = payload?.message ;
                state.resetPasswordSuccessMessage = '';
            })
            .addCase(postResetPassword.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.resetPasswordErrorMessage = '';
                state.resetPasswordSuccessMessage = payload?.message
            })
            .addCase(resetMsg, (state) => {
                state.resetPasswordErrorMessage = '';
                state.resetPasswordSuccessMessage = '';
            });
    },
});

export default slice.reducer;
