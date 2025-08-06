import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contestant {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  votes: number;
}

interface ContestantsState {
  contestants: Contestant[];
}

const initialState: ContestantsState = {
  contestants: [],
};

const contestantsSlice = createSlice({
  name: 'contestants',
  initialState,
  reducers: {
    setContestants(state, action: PayloadAction<Contestant[]>) {
      state.contestants = action.payload;
    },
    voteForContestant(state, action: PayloadAction<string>) {
      const contestant = state.contestants.find(c => c.id === action.payload);
      if (contestant) {
        contestant.votes += 1;
      }
    },
  },
});

export const { setContestants, voteForContestant } = contestantsSlice.actions;
export default contestantsSlice.reducer;