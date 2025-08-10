"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function VoterResultsPage() {
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  // Sort contestants by votes descending
  const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Voting Results</h1>
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Results Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedContestants} layout="vertical">
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={120} />
            <Tooltip />
            <Bar dataKey="votes" fill="#FF5A5F" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold mb-4">Order of Contestant Votes</h2>
        <ol className="list-decimal ml-6">
          {sortedContestants.map((c, idx) => (
            <li key={c.id} className="mb-2 flex items-center justify-between">
              <span>{c.name}</span>
              <span className="font-bold text-[#FF5A5F]">{c.votes}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
