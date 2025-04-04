import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Advertisement {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
}

interface AdvertisementState {
    advertisements: Advertisement[];
    loading: boolean;
    error: string | null;
    recentPhoto: string | null;
}

const initialState: AdvertisementState = {
    advertisements: [],
    loading: false,
    error: null,
    recentPhoto: null,
};

const advertisementSlice = createSlice({
    name: "advertisements",
    initialState,
    reducers: {
        addAdvertisement: (state, action: PayloadAction<Advertisement>) => {
            state.advertisements.push(action.payload);
        },
        updateAdvertisement: (state, action: PayloadAction<Advertisement>) => {
            const index = state.advertisements.findIndex(ad => ad.id === action.payload.id);
            if (index !== -1) {
                state.advertisements[index] = action.payload;
            }
        },
        createFacebookAd: (_state, action: PayloadAction<string>) => {
            const postId = action.payload;
            console.log(`Creating Facebook ad for post: ${postId}`);
        },
        enhanceWithAI: (_state, action: PayloadAction<string>) => {
            const postId = action.payload;
            console.log(`Enhancing post with AI: ${postId}`);
        },
        setRecentPhoto: (state, action: PayloadAction<string | null>) => {
            state.recentPhoto = action.payload;
        },
        deleteAdvertisement: (state, action: PayloadAction<string>) => {
            state.advertisements = state.advertisements.filter(advertisement => advertisement.id !== action.payload);
        },
    },
});

export const { addAdvertisement, updateAdvertisement, createFacebookAd, enhanceWithAI, setRecentPhoto, deleteAdvertisement } = advertisementSlice.actions;
export default advertisementSlice.reducer;