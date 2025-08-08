import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contestant } from '../types/contestant';

interface ContestantsState {
  contestants: Contestant[];
}

export const initialState: ContestantsState = {
  contestants: [
    {
      id: '1',
      name: 'Amara Kenyatta',
      bio: 'Nairobi County • 24 years',
      photoUrl: 'miss2.jpg',
      votes: 1245,
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Zuri Ochieng',
      bio: 'Mombasa County • 23 years',
      photoUrl: 'miss4.jpg',
      votes: 982,
      rating: 4.0,
    },
    {
      id: '3',
      name: 'Nia Kimani',
      bio: 'Kisumu County • 25 years',
      photoUrl: 'miss5.jpg',
      votes: 876,
      rating: 4.0,
    },
    {
      id: '4',
      name: 'Imani Wanjiku',
      bio: 'Nakuru County • 22 years',
      photoUrl: 'miss6.jpg',
      votes: 754,
      rating: 3.5,
    },
    {
      id: '5',
      name: 'Aisha Mwangi',
      bio: 'Eldoret County • 24 years',
      photoUrl: 'miss7.jpg',
      votes: 621,
      rating: 3.0,
    },
    {
      id: '6',
      name: 'Makena Njeri',
      bio: 'Nyeri County • 23 years',
      photoUrl: 'miss11.jpg',
      votes: 589,
      rating: 3.0,
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
    removeContestant(state, action: PayloadAction<string>) {
      state.contestants = state.contestants.filter(c => c.id !== action.payload);
    },
  },
});

export const { setContestants, voteForContestant, resetVotes, addContestant, removeContestant } = contestantsSlice.actions;
export default contestantsSlice.reducer;