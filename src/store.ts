import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './slices/leadsSlice';

const store = configureStore({
    reducer: {
        leads: leadsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;