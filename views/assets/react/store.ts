import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { useDispatch } from 'react-redux';

interface stateType {
    messages: any[];
}


<<<<<<< Updated upstream
const messagesReducer: Reducer<stateType, AnyAction> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'messages/add':
            return { ...state, messages: action.message }
        default:
            return state
=======
export const filesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload.notification as never);
        }
>>>>>>> Stashed changes
    }
});

<<<<<<< Updated upstream
const rootReducer = combineReducers({ messages: messagesReducer })
=======
const rootReducer = combineReducers({ messages: filesSlice.reducer });
>>>>>>> Stashed changes

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;