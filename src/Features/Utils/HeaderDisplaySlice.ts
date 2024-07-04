import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderDisplayState {
    isHeaderVisible: string;
}

const initialState: HeaderDisplayState = {
    isHeaderVisible: "sticky top-0 flex min-h-16 w-full items-center border-b border-border-primary bg-white px-4 md:min-h-18 md:px-8 z-[100]",
};

const headerDisplaySlice = createSlice({
    name: 'headerDisplay',
    initialState,
    reducers: {
        toggleHeaderVisibility: (state, action) => {
            state.isHeaderVisible = action.payload;
        },
    },
});

export const { toggleHeaderVisibility } = headerDisplaySlice.actions;

export default headerDisplaySlice.reducer;