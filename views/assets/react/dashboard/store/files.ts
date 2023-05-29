import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const camerasSlice = createSlice({
    name: 'cameras',
    initialState: [] as any,
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload);
        }
    }
});

export default camerasSlice;