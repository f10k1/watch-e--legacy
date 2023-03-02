import { AnyAction, combineReducers, configureStore, Store } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import { useDispatch } from 'react-redux'

interface stateType {
    messages: any[]
}

const initialState: stateType = {
    messages: []
}

const messagesReducer: Reducer<stateType, AnyAction> = (state = initialState, action: AnyAction) =>{
    switch(action.type){
        case 'messages/add':
            return {...state, messages: action.id }
        default:
            return state
    }
}

const rootReducer = combineReducers({ messages: messagesReducer})

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store