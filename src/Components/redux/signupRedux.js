import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postSignup = createAsyncThunk('signup/postSignup', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.signup, body);
        const { success, message } = response.data;
        if (success) {
            return response?.data; // Assuming this contains user and accessToken
        }
        Notification(message,'error')
        return rejectWithValue(message);
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'signup',
    initialState: {
        errorMessage: '',
        successMessage: '',
        signupSuccessMessage: '',
        signupErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postSignup.pending, (state) => {
                state.isLoading = true;
                state.signupErrorMessage = '';
                state.signupSuccessMessage = '';
            })
            .addCase(postSignup.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.signupErrorMessage = payload || 'signup failed';
                state.signupSuccessMessage = '';
            })
            .addCase(postSignup.fulfilled, (state, { payload }) => {
                const { message } = payload;

                state.isLoading = false;
                state.signupErrorMessage = '';
                state.signupSuccessMessage = message;
            })
            .addCase(resetMsg, (state) => {
                state.errorMessage = '';
                state.successMessage = '';
            });
    },
});

export default slice.reducer;
