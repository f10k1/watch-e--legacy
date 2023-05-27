import { PayloadAction, combineReducers, configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateInterface } from '../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { notificationSlice, notificationsApi } from './notifications';
const initialState: StateInterface = {
    notifications: {},
    cameras: [],
    files: []
};

export const filesSlice = createSlice({
    name: 'files',
    initialState: [] as any,
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload);
        }
    }
});

export const camerasSlice = createSlice({
    name: 'cameras',
    initialState: [] as any,
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload);
        }
    }
});

const rootReducer = combineReducers({ notifications: notificationSlice.reducer, files: filesSlice.reducer, cameras: camerasSlice.reducer, [notificationsApi.reducerPath]: notificationsApi.reducer, });
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware: any) => [...getDefaultMiddleware(), notificationsApi.middleware]
});

const AppDispatch = store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;