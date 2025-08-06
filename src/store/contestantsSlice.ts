import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contestant } from '../types/contestant'; // <-- use shared type

interface ContestantsState {
  contestants: Contestant[];
}

const initialState: ContestantsState = {
  contestants: [
    {
      id: '1',
      name: 'Aisha Mwangi',
      bio: 'Miss Nairobi County 2023',
      photoUrl: '/contestants/aisha.jpg',
      votes: 0,
    },
    {
      id: '2',
      name: 'Faith Otieno',
      bio: 'Miss Kisumu County 2023',
      photoUrl: '/contestants/faith.jpg',
      votes: 0,
    },
    {
      id: '3',
      name: 'Zainab Hassan',
      bio: 'Miss Mombasa County 2023',
      photoUrl: '/contestants/zainab.jpg',
      votes: 0,
    },
  ],
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