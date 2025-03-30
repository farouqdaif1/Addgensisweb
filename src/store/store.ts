import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "@/store/advertisementSlice";

export const store = configureStore({
    reducer: {
        advertisements: advertisementReducer, // Add the photo slice to the store
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
