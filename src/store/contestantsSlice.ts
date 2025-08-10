import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contestant } from '../types/contestant';

interface ContestantsState {
  contestants: Contestant[];
}

const initialState: ContestantsState = {
  contestants: [
    {
      id: '1',
      name: 'Aisha Mwangi',
      bio: 'Miss Nairobi County 2023',
  photoUrl: 'aisha-mohamed.jpg',
      votes: 0,
    },
    {
      id: '2',
      name: 'Faith Otieno',
      bio: 'Miss Kisumu County 2023',
  photoUrl: 'miss2.jpg',
      votes: 0,
    },
    {
      id: '3',
      name: 'Zainab Hassan',
      bio: 'Miss Mombasa County 2023',
  photoUrl: 'miss4.jpg',
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
    resetVotes(state) {
      state.contestants.forEach(c => { c.votes = 0; });
    },
    addContestant(state, action: PayloadAction<{ name: string; bio: string; photoUrl: string }>) {
      const newContestant = {
        id: (Date.now() + Math.random()).toString(),
        name: action.payload.name,
        bio: action.payload.bio,
        photoUrl: action.payload.photoUrl,
        votes: 0,
      };
      state.contestants.push(newContestant);
    },
  },
});

export const { setContestants, voteForContestant, resetVotes, addContestant } = contestantsSlice.actions;
export default contestantsSlice.reducer;