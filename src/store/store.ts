import { configureStore } from '@reduxjs/toolkit';
import contestantsReducer from './contestantsSlice';
import votesReducer from './votesSlice'; 

export const store = configureStore({
  reducer: {
    contestants: contestantsReducer,
    votes: votesReducer, 
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;