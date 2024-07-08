// src/Features/Content/contentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageProps {
  src: string;
  alt?: string;
}

interface ContentState {
  heading: string;
  description: string;
  image: ImageProps;
}

const initialState: ContentState = {
  heading: "Short heading goes here",
  description: "Default description goes here.",
  image: {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  },
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setContent } = contentSlice.actions;

export default contentSlice.reducer;
