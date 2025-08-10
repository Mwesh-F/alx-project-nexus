
"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { voteForContestant } from '../../store/contestantsSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Image from 'next/image';
import React from 'react';

const COLORS = ['#FF5A5F', '#00A699', '#FC642D', '#484848', '#007A87', '#F8A800', '#B4A76C', '#7B0051'];

const PollsPage = () => {
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const dispatch = useDispatch();
  if (!Array.isArray(contestants) || contestants.length === 0) {
    return <div className="p-10 text-center text-gray-500">No results to display yet.</div>;
  }

  // Sort contestants by votes descending
  const sorted = [...contestants].sort((a, b) => b.votes - a.votes);
  const leader = sorted[0];
  const totalVotes = contestants.reduce((sum, c) => sum + c.votes, 0);

  // For bar chart
  const chartData = contestants.map((c) => ({
    name: c.name,
    votes: c.votes,
  }));

  // For pie chart (votes by county, placeholder)
  const countyData = [
    { name: 'Nairobi', value: 8000 },
    { name: 'Kiambu', value: 6000 },
    { name: 'Mombasa', value: 4000 },
    { name: 'Other', value: 6873 },
  ];

  // For voting trend (placeholder)
  const trendData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    votes: Math.floor(Math.random() * 1000) + 1000,
    votes2: Math.floor(Math.random() * 1000) + 900,
  }));

  return (
    <div className="min-h-screen bg-[#fafbfc] p-0">
      {/* Header */}
      <div className="border-b bg-white px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Miss Kenya 2025 - Live Results</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-xs text-gray-500">Live Updates</span>
            <span className="text-xs text-gray-400 ml-2">Last updated: September 15, 2025 - 14:32 EAT</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button className="bg-[#FF5A5F] text-white px-3 py-1 rounded font-semibold text-xs">All Categories</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold text-xs">Miss Popularity</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold text-xs">Miss Talent</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold text-xs">Miss Photogenic</button>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold text-xs">Miss Congeniality</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Charts */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Overall Voting Results Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg">Overall Voting Results</h2>
              <div className="text-xs text-gray-500">Total Votes: {totalVotes.toLocaleString()} <span className="ml-2">Last 24 Hours</span></div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" hide domain={[0, 'dataMax + 100']} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 14 }} />
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Bar dataKey="votes" fill="#FF5A5F" radius={[0, 8, 8, 0]} label={{ position: 'right', fill: '#484848', fontWeight: 600 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Lower charts: Pie and Trend (placeholders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-base mb-2">Votes by County</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={countyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {countyData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-base mb-2">Voting Trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={trendData}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#FF5A5F" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="votes2" fill="#00A699" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Leader and Top Contenders */}
        <div className="flex flex-col gap-8">
          {/* Current Leader */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="relative w-36 h-36 mb-3">
              <Image
                src={leader.photoUrl?.startsWith('/') ? leader.photoUrl : (leader.photoUrl ? `/${leader.photoUrl}` : '/placeholder.jpg')}
                alt={leader.name}
                width={144}
                height={144}
                className="rounded-lg object-cover border-4 border-[#FF5A5F]"
              />
              <span className="absolute top-2 right-2 bg-[#FF5A5F] text-white text-xs px-2 py-1 rounded font-bold">{((leader.votes / totalVotes) * 100).toFixed(0)}% Votes</span>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{leader.name}</div>
              <div className="text-xs text-gray-500 mb-2">Contestant #{leader.id} · {leader.county || 'Nairobi County'}</div>
              <div className="text-xs text-gray-600 mb-3">Leading in 14 counties with strong support from youth voters aged 18-25.</div>
              <button className="w-full bg-[#FF5A5F] hover:bg-[#e14c50] text-white font-semibold py-2 rounded transition">Vote for {leader.name.split(' ')[0]}</button>
            </div>
          </div>

          {/* Top Contenders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-base mb-4">Top Contenders</h3>
            <div className="flex flex-col gap-3">
              {sorted.slice(1, 5).map((c, idx) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={c.photoUrl?.startsWith('/') ? c.photoUrl : (c.photoUrl ? `/${c.photoUrl}` : '/placeholder.jpg')}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-xs text-gray-500">Contestant #{c.id} · {c.county || 'County'}</div>
                  </div>
                  <div className="font-bold text-[#FF5A5F] text-lg">{((c.votes / totalVotes) * 100).toFixed(0)}<span className="text-xs align-super">%</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollsPage;
