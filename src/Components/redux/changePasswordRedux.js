import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postChangePassword = createAsyncThunk('changePassword/postChangePassword', async (data, { rejectWithValue }) => {
    const body = {...data}
    try {
        const response = await apiGateway.put(serviceEndpoints.changePassword,body);
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
    name: 'changePassword',
    initialState: {
        errorMessage: '',
        successMessage: '',
        changePasswordSuccessMessage: '',
        changePasswordErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postChangePassword.pending, (state) => {
                state.isLoading = true;
                state.changePasswordErrorMessage = '';
                state.changePasswordSuccessMessage = '';
            })
            .addCase(postChangePassword.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.changePasswordErrorMessage = payload?.message ;
                state.changePasswordSuccessMessage = '';
            })
            .addCase(postChangePassword.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.changePasswordErrorMessage = '';
                state.changePasswordSuccessMessage = payload?.message
            })
            .addCase(resetMsg, (state) => {
                state.changePasswordErrorMessage = '';
                state.changePasswordSuccessMessage = '';
            });
    },
});

export default slice.reducer;
