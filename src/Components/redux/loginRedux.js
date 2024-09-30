import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postLogin = createAsyncThunk('login/postLogin', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.login, body);
        const { success, message } = response?.data;
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
    name: 'login',
    initialState: {
        errorMessage: '',
        successMessage: '',
        logInSuccessMessage: '',
        logInErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postLogin.pending, (state) => {
                state.isLoading = true;
                state.logInErrorMessage = '';
                state.logInSuccessMessage = '';
            })
            .addCase(postLogin.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.logInErrorMessage = payload || 'Login failed';
                state.logInSuccessMessage = '';
            })
            .addCase(postLogin.fulfilled, (state, { payload }) => {
                const { token, success, message,isBlocked } = payload;
                if (success && token) {
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('IsBlocked', isBlocked);
                    // window.location.href='/movie-listing-page'
                }

                state.isLoading = false;
                state.logInErrorMessage = '';
                state.logInSuccessMessage = message;
            })
            .addCase(resetMsg, (state) => {
                state.errorMessage = '';
                state.successMessage = '';
            });
    },
});

export default slice.reducer;
