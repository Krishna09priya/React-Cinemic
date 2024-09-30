import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';
import { getQueryParams } from '../../utils/queryParams';


export const resetMsg = createAction('resetMsg');

export const getMovieList = createAsyncThunk('/getMovielist', async (data, { rejectWithValue }) => {
    try {
        const{...params}=data
        const response = await apiGateway.get(`${serviceEndpoints.movielist}?${getQueryParams(params)}`);
        const { success, message } = response.data;
        if (success) {
            return response?.data;
        }
        Notification(message,'error')
        return rejectWithValue(message);
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'movies',
    initialState: {
        errorMessage: '',
        successMessage: '',
        movieListSuccessMessage: '',
        movieListErrorMessage: '',
        ErrorMessage: '',
        isLoading: false,
        movielist:{}
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMovieList.pending, (state) => {
                state.isLoading = true;
                state.movieListErrorMessage = '';
                state.movieListSuccessMessage = '';
            })
            .addCase(getMovieList.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.movieListErrorMessage = payload.message ;
                state.movieListSuccessMessage = '';
            })
            .addCase(getMovieList.fulfilled, (state, { payload }) => {
                state.movielist =payload || null;
                state.isLoading = false;
                state.movieListErrorMessage = '';
                state.movieListSuccessMessage = payload.message;
            })
            .addCase(resetMsg, (state) => {
                state.errorMessage = '';
                state.successMessage = '';
            });
    },
});

export default slice.reducer;
