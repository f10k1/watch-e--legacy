import { AnyAction, PayloadAction, combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { useDispatch } from 'react-redux';

export interface stateType {
    notifications: any[],
    files: any[],
    cameras: any[];
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload as never);
        }
    }
});

export const filesSlice = createSlice({
    name: 'files',
    initialState: [],
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload.notification as never);
        }
    }
});

export const camerasSlice = createSlice({
    name: 'cameras',
    initialState: [],
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload.notification as never);
        }
    }
});

const rootReducer = combineReducers({ notifications: notificationSlice.reducer, files: filesSlice.reducer, cameras: camerasSlice.reducer });

const store = configureStore({
    reducer: rootReducer,
});

export default store;