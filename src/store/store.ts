
import { configureStore } from '@reduxjs/toolkit';
import contestantsReducer from './contestantsSlice';
import votesReducer from './votesSlice';


// Hydrate contestants from localStorage if available and non-empty, else use initialState
import { initialState as contestantsInitialState } from './contestantsSlice';
const initialContestants = contestantsInitialState.contestants;
function loadContestants() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('contestants');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
      }
    }
  }

  return initialContestants;
}

const preloadedState = {
  contestants: { contestants: loadContestants() },
};

export const store = configureStore({
  reducer: {
    contestants: contestantsReducer,
    votes: votesReducer,
  },
  preloadedState,
});

// Persist contestants to localStorage on change
store.subscribe(() => {
  const state = store.getState();
  if (typeof window !== 'undefined') {
    localStorage.setItem('contestants', JSON.stringify(state.contestants.contestants));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;