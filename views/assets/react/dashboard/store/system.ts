import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SystemInterface, SystemNotificationInterface } from "../interfaces/interfaces";

const initialState: SystemInterface = { config: {}, notificationQueue: [] };

const systemSlice = createSlice({
    name: 'system',
    initialState: initialState,
    reducers: {
        addNotification(state, action: PayloadAction<SystemNotificationInterface>) {
            state.notificationQueue.push(action.payload);
        },
        remove(state) {
            state.notificationQueue.pop();
        }
    }
});

export default systemSlice;