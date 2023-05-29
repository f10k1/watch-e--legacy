import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import notificationSlice, { notificationsApi } from './notifications';
import filesSlice from './cameras';
import camerasSlice from './files';
import systemSlice from './system';
import { StateInterface } from '../interfaces/interfaces';
import t from '../../../ts/helpers/i18n'

const crashReporter = (store: StateInterface) => (next: AppDispatch) => (action: AnyAction) => {
    try {
        if (action.error) {
            throw new Error(action.error.message);
        }
        return next(action);
    } catch (err) {
        console.error('Caught an exception!', err);
        next(systemSlice.actions.addNotification({ type: 'error', description: t('Something went wrong') }));
        throw err;
    }
};

const rootReducer = combineReducers({ notifications: notificationSlice.reducer, files: filesSlice.reducer, cameras: camerasSlice.reducer, [notificationsApi.reducerPath]: notificationsApi.reducer, system: systemSlice.reducer });
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware: any) => [...getDefaultMiddleware(), notificationsApi.middleware, crashReporter]
});

const AppDispatch = store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;