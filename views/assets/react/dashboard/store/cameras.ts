import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const filesSlice = createSlice({
    name: 'files',
    initialState: [] as any,
    reducers: {
        add(state, action: PayloadAction<any>) {
            state.push(action.payload);
        }
    }
});

export default filesSlice; 