import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VotesState {
  votedContestantIds: string[];
}

const initialState: VotesState = {
  votedContestantIds: [],
};

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    addVote(state, action: PayloadAction<string>) {
      state.votedContestantIds.push(action.payload);
    },
    resetVotes(state) {
      state.votedContestantIds = [];
    },
  },
});

export const { addVote, resetVotes } = votesSlice.actions;
export default votesSlice.reducer;