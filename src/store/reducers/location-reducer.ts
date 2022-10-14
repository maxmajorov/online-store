import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import { RootStateType } from '../store';

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

const slice = createSlice({
    name: 'location',
    initialState: {
        locations: [],
    },
    reducers: {
        // setLocationMarkerAC(state, ) {
        //     state.locations.push(payload);
        // },
    },
});

export const locationReducer = slice.reducer;

// export const { setLocationMarkerAC } = slice.actions;

// ==== SELECTORS ====

// ==== TYPES ====
