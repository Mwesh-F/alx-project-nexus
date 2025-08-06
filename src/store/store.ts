import { configureStore } from '@reduxjs/toolkit';
import contestantsReducer from './contestantsSlice';

export const store = configureStore({
  reducer: {
    contestants: contestantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;