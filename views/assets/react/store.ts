import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { useDispatch } from 'react-redux';

export interface stateType {
    messages: any[];
}


export const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload.notification as never);
        }
    }
});

const rootReducer = combineReducers({ messages: messagesSlice.reducer });

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;