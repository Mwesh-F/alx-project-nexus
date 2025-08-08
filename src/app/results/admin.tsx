"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addContestant, removeContestant } from '../../store/contestantsSlice';
import { useForm } from 'react-hook-form';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { useState } from 'react';
import Image from 'next/image';

const CATEGORY_TABS = [
  { label: "All Categories", value: "all" },
  { label: "Miss Popularity", value: "miss-popularity" },
  { label: "Miss Talent", value: "miss-talent" },
  { label: "Miss Photogenic", value: "miss-photogenic" },
  { label: "Miss Congeniality", value: "miss-congeniality" },
];

const COLORS = ["#FF5A5F", "#00B6F0", "#FFB347", "#7D5FFF", "#00C48C"];

type Contestant = {
  id: number | string;
  name: string;
  bio: string;
  photoUrl: string;
  votes: number;
};

function getCurrentLeader(contestants: Contestant[]) {
  if (!contestants.length) return null;
  return contestants.reduce((max, c) => (c.votes > max.votes ? c : max));
}

function getTopContenders(contestants: Contestant[], count = 3) {
  return [...contestants].sort((a, b) => b.votes - a.votes).slice(0, count);
}

function getPieData(contestants: Contestant[]) {
  // Mock: group by county in bio
  const countyMap: Record<string, number> = {};
  contestants.forEach(c => {
    const county = (c.bio || '').split('•')[0].trim();
    countyMap[county] = (countyMap[county] || 0) + c.votes;
  });
  return Object.entries(countyMap).map(([name, value]) => ({ name, value }));
}

function getVotingTrendData(contestants: Contestant[]): { time: string; votes: number }[] {
  // Mock: random walk for demo
  const trend: { time: string; votes: number }[] = [];
  let total = contestants.reduce((sum: number, c: Contestant) => sum + c.votes, 0);
  for (let i = 0; i < 20; i++) {
    total = Math.max(0, total - Math.floor(Math.random() * 10));
    trend.push({ time: `T${i + 1}`, votes: total });
  }
  return trend;
}

export default function AdminResultsPage() {
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdated] = useState(new Date());

  // Sort contestants by votes descending
  const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes);
  const currentLeader = getCurrentLeader(sortedContestants);
  const topContenders = getTopContenders(sortedContestants);
  const pieData = getPieData(contestants);
  const votingTrendData = getVotingTrendData(contestants);
  const totalVotes = contestants.reduce((sum, c) => sum + c.votes, 0);

  const onAdd = (data: any) => {
    dispatch(addContestant(data));
    reset();
    setShowAdd(false);
  };

  const onRemove = (id: string | number) => {
    dispatch(removeContestant(String(id)));
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen px-2 py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Miss Kenya 2023 - Live Results</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-700">Live Updates</span>
          <span className="text-xs text-gray-400 ml-2">
            Last updated: {lastUpdated.toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })} EAT
          </span>
        </div>
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.value}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                tab.value === selectedCategory
                  ? "bg-[#FF5A5F] text-white border-[#FF5A5F]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-[#FFE5E5]"
              }`}
              onClick={() => setSelectedCategory(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Voting Results */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Overall Voting Results</h2>
                <span className="text-xs text-gray-500">
                  Total Votes: {totalVotes.toLocaleString()} &nbsp;
                  <select className="border rounded px-2 py-1 text-xs">
                    <option>Last 24 Hours</option>
                  </select>
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sortedContestants} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#FF5A5F" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Votes by County Pie Chart */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-md font-bold text-gray-900 mb-2">Votes by County</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Voting Trend Line Chart */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-md font-bold text-gray-900 mb-2">Voting Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={votingTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="votes" stroke="#FF5A5F" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Right: Leader & Top Contenders */}
          <div className="space-y-8">
            {/* Current Leader */}
            {currentLeader && (
              <div className="bg-[#FCFCFC] rounded-2xl shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Current Leader</h3>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={`/${currentLeader.photoUrl}`}
                      alt={currentLeader.name}
                      className="w-32 h-32 object-cover rounded-xl mb-2 border-4 border-[#FF5A5F]"
                    />
                    <span className="absolute top-2 right-2 bg-[#FF5A5F] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                      {Math.round((currentLeader.votes / totalVotes) * 100) || 0}% Votes
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{currentLeader.name}</div>
                  <div className="text-sm text-gray-500 mb-2">
                    Contestant #{currentLeader.id} • {currentLeader.bio}
                  </div>
                  <div className="text-xs text-gray-600 mb-3">
                    Leading in several counties with strong support from youth voters aged 18-25.
                  </div>
                  <button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200">
                    Vote for {currentLeader.name}
                  </button>
                </div>
              </div>
            )}
            {/* Top Contenders */}
            <div className="bg-[#FCFCFC] rounded-2xl shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4">Top Contenders</h3>
              <ul>
                {topContenders.map((c, idx) => (
                  <li key={c.id} className="flex items-center mb-4">
                    <img
                      src={`/${c.photoUrl}`}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-[#FF5A5F]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-500">Contestant #{c.id} • {c.bio}</div>
                    </div>
                    <span className="text-[#FF5A5F] font-bold text-lg">{Math.round((c.votes / totalVotes) * 100) || 0}</span>
                    <span className="ml-1 text-xs text-gray-500">%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Manage Contestants Section */}
        <div className="bg-white rounded-2xl shadow p-6 mt-10 max-w-2xl mx-auto">
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
              <input {...register('bio', { required: true })} placeholder="Bio (e.g. Nairobi County)" className="px-3 py-2 border rounded" />
              <input {...register('photoUrl', { required: true })} placeholder="Photo URL (e.g. miss2.jpg)" className="px-3 py-2 border rounded" />
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
