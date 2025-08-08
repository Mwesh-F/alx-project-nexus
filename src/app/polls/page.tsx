'use client';
import dynamic from 'next/dynamic';
const VotesBarChart = dynamic(() => import('../../components/VotesBarChart'), { ssr: false });
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

// JWT-based authentication state
const useAuth = () => {
  if (typeof window !== 'undefined') {
    return Boolean(localStorage.getItem('access'));
  }
  return false;
};
import { RootState } from '../../store';
import { voteForContestant } from '../../store/contestantsSlice';

const CATEGORIES = [
  { label: "Miss Kenya National", value: "miss-kenya", active: true },
  { label: "Miss Regional", value: "miss-regional", active: false },
  { label: "Miss University", value: "miss-university", active: false },
  { label: "Miss Talent", value: "miss-talent", active: false },
  { label: "Miss Congeniality", value: "miss-congeniality", active: false },
];




export default function PollsPage() {
  const isSignedIn = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("miss-kenya");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  // Track voted contestant in localStorage
  const [votedId, setVotedId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('votedContestantId');
      if (stored) setVotedId(stored);
    }
  }, []);

  // Voting handler using JWT token (ready for backend integration)
  const handleVote = async (id: string) => {
    if (!isSignedIn) return;
    if (!votedId) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
      try {
        const res = await fetch('http://127.0.0.1:8000/api/users/vote/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ contestantId: id }),
        });
        if (res.ok) {
          dispatch(voteForContestant(id));
          setVotedId(id);
          if (typeof window !== 'undefined') {
            localStorage.setItem('votedContestantId', id);
          }
        } else {
          const data = await res.json();
          alert(data.detail || 'Failed to vote. Please try again.');
        }
      } catch (err) {
        alert('Failed to vote. Please try again.');
      }
    }
  };

  // Get contestants from Redux
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const PAGE_SIZE = 6;
  const paginatedContestants = contestants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(contestants.length / PAGE_SIZE);
  const totalVotes = contestants.reduce((sum, c) => sum + c.votes, 0);
  const timeRemaining = "3 days";

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-10 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Logout Button */}
        {typeof window !== 'undefined' && localStorage.getItem('access') && (
          <button
            onClick={() => {
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              window.location.reload();
            }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold float-right mb-4"
          >
            Logout
          </button>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Miss Kenya 2023 - Vote for Your Favorite
        </h1>
        <p className="text-gray-700 mb-8">
          Cast your vote to help crown the next Miss Kenya. Voting closes on September 30th, 2025.
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat.value}>
                    <button
                      className={`flex items-center w-full text-left px-2 py-2 rounded-lg font-medium transition ${
                        selectedCategory === cat.value
                          ? "bg-[#FFE5E5] text-[#FF5A5F]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => cat.active && setSelectedCategory(cat.value)}
                      disabled={!cat.active}
                    >
                      {cat.label}
                      {selectedCategory === cat.value && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-[#FF5A5F]"></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Voting Stats */}
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-gray-900 mb-4">Voting Stats</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 text-sm">Total Votes Cast</span>
                <span className="text-[#FF5A5F] font-bold">{totalVotes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 text-sm">Time Remaining</span>
                <span className="text-[#FF5A5F] font-bold">{timeRemaining}</span>
              </div>
              <Link href="/results" className="block mt-4 text-[#FF5A5F] font-semibold text-sm hover:underline">
                View Live Results &rarr;
              </Link>
            </div>
          </div>
          {/* Main Voting Area */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {/* Category Banner */}
            <div className="bg-[#FFE5E5] rounded-xl flex flex-col md:flex-row items-center justify-between p-6 mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#FF5A5F] mb-1">Miss Kenya National</h2>
                <p className="text-gray-700 text-sm">
                  Vote for the contestant who will represent Kenya on the international stage
                </p>
              </div>
              <Link href="/about" className="mt-4 md:mt-0">
                <button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200">
                  How Voting Works
                </button>
              </Link>
            </div>
            {/* Votes Chart Visualization */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Vote Results</h3>
              <VotesBarChart
                labels={contestants.map(c => c.name)}
                votes={contestants.map(c => c.votes)}
              />
            </div>
            {/* Sign-in Prompt */}
            {!isSignedIn && (
              <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-6 text-center">
                <span className="font-semibold">Please sign in or sign up to vote.</span>
                <Link href="/signin" className="ml-2 text-[#FF5A5F] font-bold underline">Sign In</Link>
                <span className="mx-1">or</span>
                <Link href="/signup" className="text-[#FF5A5F] font-bold underline">Sign Up</Link>
              </div>
            )}
            {/* Contestant Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedContestants.map((c, idx) => (
                <div key={c.id} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center relative">
                  <img
                    src={`/${c.photoUrl}`}
                    alt={c.name}
                    className="w-48 h-64 object-cover rounded-xl mb-4"
                  />
                  <span className="absolute top-4 right-4 bg-[#FF5A5F] text-white font-bold px-3 py-1 rounded-full text-xs">
                    {String((page - 1) * PAGE_SIZE + idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                  <div className="text-gray-600 text-sm mb-1">{c.bio}</div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-semibold text-gray-800">{c.votes}</span>
                    <span className="text-gray-500 text-xs ml-2">({c.votes.toLocaleString()} votes)</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    {/* No profileUrl in Contestant type, so remove View Profile link */}
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${!isSignedIn || votedId ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FF5A5F] hover:bg-[#E31C5F] text-white'}`}
                      onClick={() => handleVote(c.id)}
                      disabled={!isSignedIn || !!votedId}
                    >
                      {!isSignedIn ? 'Sign in to Vote' : votedId ? 'Vote Cast' : 'Vote Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-gray-600 mt-6 mb-4">
              Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, contestants.length)} of {contestants.length} contestants
            </div>
            {/* Pagination */}
            <div className="flex justify-center gap-2 mb-10">
              <button
                className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                1
              </button>
              {totalPages > 1 && (
                <button
                  className={`px-3 py-1 rounded ${page === 2 ? 'bg-[#FF5A5F] text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setPage(2)}
                  disabled={page === 2}
                >
                  2
                </button>
              )}
              {totalPages > 2 && <span className="px-3 py-1 text-gray-400">Next</span>}
            </div>
            {/* Voting Process Info */}
            <div className="bg-[#FFF3F0] rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Want to know more about our voting process?
                </h3>
                <p className="text-gray-700 mb-4">
                  Learn about our secure and transparent voting system, how we prevent fraud, and how the results are calculated.
                </p>
                <div className="flex gap-4">
                  <Link href="/about" className="text-[#FFB3B3] font-bold hover:underline">
                    About CrownVote
                  </Link>
                  <Link href="/contact" className="text-[#FF5A5F] font-bold hover:underline">
                    Contact Support
                  </Link>
                </div>
              </div>
              <img
                src="/flamingo-vote.png"
                alt="Voting Illustration"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}