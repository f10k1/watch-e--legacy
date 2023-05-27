import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import axios from "axios";
import { NotificationInterface } from "../interfaces/interfaces";

function isNotification(notification: any) {
    if (typeof notification.description !== 'string' ||
        typeof notification.title !== 'string' ||
        typeof notification.type !== 'string' ||
        typeof notification.watched !== "boolean") return false;

    return true;
}

export const notificationsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/ajax/notifications', prepareHeaders: (headers, getState) => {
            headers.set('X-CSRF-TOKEN', (window as any).csrf ?? '');
        }
    }),
    endpoints: (build) => ({
        getNotifications: build.query({
            query: () => ``,
            async onCacheEntryAdded(
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {

                // const ws = new WebSocket(`ws://${location.host}/notifications`);
                // try {
                //     await cacheDataLoaded;

                //     const listener = (event: MessageEvent) => {
                //         const data = JSON.parse(event.data);
                //         if (!isNotification(data)) return;

                //         updateCachedData((draft: NotificationInterface[]) => {
                //             draft.push(data);
                //         });
                //     };

                //     ws.addEventListener('message', listener);
                // } catch (err) {
                //     console.log(err);
                // }
                // await cacheEntryRemoved;

                // ws.close();
            },
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationsApi;

export const markNotificationAsWatched = createAsyncThunk('notification/markAsWatched', async (id: number) => {
    try {
        const response = await axios.patch('/ajax/notification', {
            id: id,
            watched: true
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }

});

export const deleteNotification = createAsyncThunk('notification/delete', async (id: number) => {
    try {
        const response = await axios.delete('/ajax/notification', {
            data: { id: id },
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }

});

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {} as any,
    reducers: {
        add(state, actions: PayloadAction<NotificationInterface | NotificationInterface[]>) {
            if (actions.payload.constructor === Array) actions.payload.forEach(notification => state[notification.id] = notification);
            else state[(actions.payload as NotificationInterface).id] = actions.payload;
        },
        delete(state, action: PayloadAction<number>) {
            delete state[action.payload];
        },
        markAsWatched(state, action: PayloadAction<number>) {
            state[action.payload].watched = true;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(markNotificationAsWatched.fulfilled, (state, action) => {
                state[action.payload.id] = action.payload;
            });
    }
});