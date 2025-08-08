"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addContestant, removeContestant } from '../../store/contestantsSlice';
import { useForm } from 'react-hook-form';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function AdminResultsPage() {
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Sort contestants by votes descending
  const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes);

  const onAdd = (data: any) => {
    dispatch(addContestant(data));
    reset();
    setShowAdd(false);
  };

  const onRemove = (id: string) => {
    dispatch(removeContestant(id));
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Voting Results</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-4">Manage Contestants</h2>
          <button
            className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
            onClick={() => setShowAdd(!showAdd)}
          >
            {showAdd ? 'Cancel' : 'Add Contestant'}
          </button>
          {showAdd && (
            <form onSubmit={handleSubmit(onAdd)} className="mb-4 flex flex-col gap-2">
              <input {...register('name', { required: true })} placeholder="Name" className="px-3 py-2 border rounded" />
              <input {...register('bio', { required: true })} placeholder="Bio" className="px-3 py-2 border rounded" />
              <input {...register('photoUrl', { required: true })} placeholder="Photo URL" className="px-3 py-2 border rounded" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">Add</button>
            </form>
          )}
          <ul>
            {contestants.map(c => (
              <li key={c.id} className="flex items-center justify-between mb-2">
                <span>{c.name}</span>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                  onClick={() => onRemove(c.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
