'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { voteForContestant, resetVotes, addContestant } from '../../store/contestantsSlice';
import { addVote } from '../../store/votesSlice';
import { useForm as useContestantForm } from 'react-hook-form';
import { z as zContestant } from 'zod';
import { zodResolver as zodContestantResolver } from '@hookform/resolvers/zod';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const CATEGORY_TABS = [
  { label: "All Categories", value: "all" },
  { label: "Miss Kenya", value: "miss-kenya" },
  { label: "Miss Popularity", value: "miss-popularity" },
  { label: "Miss Talent", value: "miss-talent" },
  { label: "Miss Photogenic", value: "miss-photogenic" },
  { label: "Miss Congeniality", value: "miss-congeniality" },
];

function getCurrentLeader(contestants: Array<{ id: string; name: string; bio: string; photoUrl: string; votes: number }>) {
  if (contestants.length === 0) return null;
  return contestants.reduce((max, c) => (c.votes > max.votes ? c : max));
}

interface Contestant {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  votes: number;
}

function getTopContenders(contestants: Contestant[], count: number = 4): Contestant[] {
  return [...contestants].sort((a, b) => b.votes - a.votes).slice(0, count);
}

interface VotingTrendPoint {
  time: string;
  votes: number;
}

interface VotingTrendContestant {
  votes: number;
}

function getVotingTrendData(contestants: VotingTrendContestant[]): VotingTrendPoint[] {
  // Mock trend: random walk for demo; replace with real data if available
  const trend: VotingTrendPoint[] = [];
  for (let i = 0; i < 20; i++) {
    trend.push({
      time: `T${i + 1}`,
      votes: contestants.reduce((sum, c) => sum + Math.max(0, c.votes - Math.floor(Math.random() * 10)), 0),
    });
  }
  return trend;
}

const PollsPage = () => {
  const [activeTab, setActiveTab] = useState<'voter' | 'admin'>('voter');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [newContestant, setNewContestant] = useState({ name: '', bio: '', photoUrl: '' });
  const [selectedCategory, setSelectedCategory] = useState('miss-kenya');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [finale, setFinale] = useState({
    title: "Miss Kenya 2023 Grand Finale",
    description: "Join us for the spectacular crowning event at the Kenyatta International Convention Centre on June 30th, 2023. Witness the culmination of months of competition as we crown the new Miss Kenya 2023.",
    date: "2023-06-30",
    time: "19:00",
    location: "KICC, Nairobi",
    broadcast: "KTN Home, YouTube Live",
    voteCloses: "2023-06-30T18:00:00",
    imageUrl: "/stage-event.jpg",
  });
  const [countdown, setCountdown] = useState("");
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const dispatch = useDispatch();

  // Auto-update last updated timestamp every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  // Only show Miss Kenya contestants for now
  const filteredContestants = contestants; // Update filter logic when adding more categories

  const currentLeader = getCurrentLeader(filteredContestants);
  const topContenders = getTopContenders(filteredContestants);
  const votingTrendData = getVotingTrendData(filteredContestants);

  const handleVote = (id: string) => {
    dispatch(voteForContestant(id));
    dispatch(addVote(id));
  };

  const voterSchema = zContestant.object({
    email: zContestant.string().email({ message: "Invalid email address" }),
    password: zContestant.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  type VoterFormData = zContestant.infer<typeof voterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useContestantForm<VoterFormData>({
    resolver: zodContestantResolver(voterSchema),
  });

  const onVoterLogin = async (data: VoterFormData) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (res.ok) {
        const result = await res.json();
        if (typeof window !== 'undefined') {
          localStorage.setItem('access', result.access);
          localStorage.setItem('refresh', result.refresh);
        }
        setIsAuthenticated(true);
        alert('Login successful! You can now view the results.');
      } else {
        const error = await res.json();
        alert(error.detail || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  // Admin login using backend authentication
  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('adminUsername');
    const password = formData.get('adminPassword');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, username, password }),
      });
      if (res.ok) {
        const result = await res.json();
        if (typeof window !== 'undefined') {
          localStorage.setItem('access', result.access);
          localStorage.setItem('refresh', result.refresh);
        }
        setIsAdminAuthenticated(true);
        alert('Admin login successful!');
      } else {
        const error = await res.json();
        alert(error.detail || 'Invalid admin credentials.');
      }
    } catch (err) {
      alert('Admin login failed. Please try again.');
    }
  };

  const handleAddContestant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContestant(newContestant));
    setNewContestant({ name: '', bio: '', photoUrl: '' });
  };


  // adminCredentials can remain for admin login if needed

  const contestantSchema = zContestant.object({
    name: zContestant.string().min(2, { message: "Name is required" }),
    bio: zContestant.string().min(5, { message: "Bio is required" }),
    photoUrl: zContestant.string().url({ message: "Photo URL must be valid" }),
  });

  type ContestantFormData = zContestant.infer<typeof contestantSchema>;

  const {
    register: registerContestant,
    handleSubmit: handleSubmitContestant,
    formState: { errors: contestantErrors },
    reset: resetContestantForm,
  } = useContestantForm<ContestantFormData>({
    resolver: zodContestantResolver(contestantSchema),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const finaleDate = new Date(`${finale.date}T${finale.time}:00`);
      const diff = finaleDate.getTime() - new Date().getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setCountdown(`${days} days ${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
      } else {
        setCountdown("Contest ended");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [finale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Results Page Navigation */}
      <div className="flex gap-4 justify-center py-4">
        <Link href="/results/admin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Admin Results</Link>
        <Link href="/results/voter" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Voter Results</Link>
      </div>
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              CrownVote Online Voting
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Secure, transparent, and easy-to-use voting platform for Miss County and Miss Kenya pageants
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Voting Interface */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Organization</h2>
                <p className="text-gray-600">Online Voting</p>
              </div>

              {/* Tab Navigation */}
              <div className="flex bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setActiveTab('voter')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'voter'
                      ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  Voter Login
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'admin'
                      ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  Admin Login
                </button>
              </div>

              {/* Voter Login Form */}
              {activeTab === 'voter' && (
                <form className="space-y-6" onSubmit={handleSubmit(onVoterLogin)}>
                  <div className="text-center">
                    <p className="text-gray-700 mb-4">To vote, please submit your Email Address and Password</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                        {...register('password')}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="group w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span className="group-hover:scale-105 transition-transform duration-300">Access Voting Booth</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Don't have credentials? Contact your administrator
                    </p>
                  </div>
                </form>
              )}

              {/* Admin Login Form */}
              {activeTab === 'admin' && !isAdminAuthenticated && (
                <form className="space-y-6" onSubmit={handleAdminLogin}>
                  <div className="text-center">
                    <p className="text-gray-700 mb-4">Admin access for managing polls and results</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Username
                      </label>
                      <input
                        type="text"
                        name="adminUsername"
                        placeholder="Enter admin username"
                        defaultValue="admin"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Password
                      </label>
                      <input
                        type="password"
                        name="adminPassword"
                        placeholder="Enter admin password"
                        defaultValue="admin123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span className="group-hover:scale-105 transition-transform duration-300">Access Admin Panel</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Admin credentials required for access<br />
                      <span className="font-semibold">Default: admin / admin123</span>
                    </p>
                  </div>
                </form>
              )}

              {/* Admin Authenticated View */}
              {activeTab === 'admin' && isAdminAuthenticated && (
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">Welcome, Admin!</h2>
                  <p className="text-gray-700 mb-6">You now have access to manage polls and view results.</p>
                  {/* Admin-only table and reset votes button removed as requested */}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                An online voting tool
              </h2>
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 mb-6">
                you can trust
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                CrownVote provides secure, transparent, and user-friendly voting solutions for pageant competitions.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Voting</h3>
                <p className="text-gray-600 text-sm">
                  End-to-end encryption ensures your votes remain confidential and secure.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Results</h3>
                <p className="text-gray-600 text-sm">
                  Watch live results as votes come in with our real-time dashboard.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Vote from any device - desktop, tablet, or mobile phone.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Access</h3>
                <p className="text-gray-600 text-sm">
                  Quick and easy voting process with instant confirmation.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center lg:text-left">
              <Link 
                href="/about"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="group-hover:scale-105 transition-transform duration-300">Learn More About CrownVote</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Voting Section - Display Contestants and Voting Buttons */}
        {isAuthenticated && (
          <div className="mt-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Vote for Your Favorite Contestant</h1>
            <div className="grid md:grid-cols-3 gap-8">
              {contestants.map(contestant => (
                <div key={contestant.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                  <img
                    src={contestant.photoUrl}
                    alt={contestant.name}
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                  <h2 className="text-xl font-semibold">{contestant.name}</h2>
                  <p className="text-gray-600 mb-4">{contestant.bio}</p>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                    onClick={() => handleVote(contestant.id)}
                  >
                    Vote
                  </button>
                  <span className="mt-2 text-gray-700">Votes: {contestant.votes}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Contestant Form - Admin Only */}
        {isAdminAuthenticated && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Contestant</h2>
            <form
              className="mb-8 flex flex-col md:flex-row items-center gap-4 justify-center"
              onSubmit={handleSubmitContestant(data => {
                dispatch(addContestant(data));
                resetContestantForm();
              })}
            >
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="px-3 py-2 border rounded"
                  {...registerContestant('name')}
                />
                {contestantErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{contestantErrors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Bio"
                  className="px-3 py-2 border rounded"
                  {...registerContestant('bio')}
                />
                {contestantErrors.bio && (
                  <p className="text-red-500 text-xs mt-1">{contestantErrors.bio.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="px-3 py-2 border rounded"
                  {...registerContestant('photoUrl')}
                />
                {contestantErrors.photoUrl && (
                  <p className="text-red-500 text-xs mt-1">{contestantErrors.photoUrl.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
              >
                Add Contestant
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Voting Results Section - Authenticated Users */}
      {isAuthenticated && (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main: Voting Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab.value}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    tab.value === selectedCategory
                      ? "bg-[#FF5A5F] text-white border-[#FF5A5F]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-[#FFE5E5]"
                  }`}
                  onClick={() => setSelectedCategory(tab.value)}
                  disabled={tab.value !== "miss-kenya"}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Live Update Bar */}
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">Live Updates</span>
              <span className="text-xs text-gray-400 ml-2">
                Last updated: {lastUpdated.toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })} EAT
              </span>
            </div>
            {/* Overall Voting Results */}
            <div className="bg-[#FCFCFC] rounded-2xl shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Overall Voting Results</h2>
                <span className="text-xs text-gray-500">
                  Total Votes: {filteredContestants.reduce((sum, c) => sum + c.votes, 0)}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={filteredContestants}
                  layout="vertical"
                  margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
                >
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#FF5A5F" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Voting Trend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FCFCFC] rounded-2xl shadow p-6">
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
                      src={currentLeader.photoUrl}
                      alt={currentLeader.name}
                      className="w-32 h-32 object-cover rounded-xl mb-2 border-4 border-[#FF5A5F]"
                    />
                    <span className="absolute top-2 right-2 bg-[#FF5A5F] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                      {Math.round((currentLeader.votes / filteredContestants.reduce((sum, c) => sum + c.votes, 0)) * 100) || 0}% Votes
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{currentLeader.name}</div>
                  <div className="text-sm text-gray-500 mb-2">
                    Contestant #{currentLeader.id} • Nairobi County
                  </div>
                  <div className="text-xs text-gray-600 mb-3">
                    Leading with strong support from youth voters aged 18-25.
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
                      src={c.photoUrl}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-[#FF5A5F]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-500">Contestant #{c.id} • {c.bio}</div>
                    </div>
                    <span className="text-[#FF5A5F] font-bold text-lg">{c.votes}</span>
                    <span className="ml-1 text-xs text-gray-500">votes</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Finale Settings Section - Admin Only */}
      {isAdminAuthenticated && (
        <div className="bg-[#FFE5E5] rounded-2xl shadow p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={finale.imageUrl}
              alt={finale.title}
              className="rounded-xl w-full md:w-72 h-44 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-900">{finale.title}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-2">
                <div>
                  <span className="font-semibold text-gray-900">Date</span>
                  <div>{finale.date}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Time</span>
                  <div>{finale.time}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Location</span>
                  <div>{finale.location}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Broadcast</span>
                  <div>{finale.broadcast}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Voting Closes</span>
                  <div>{finale.voteCloses}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Contest Finale */}
      <div className="bg-[#FFE5E5] rounded-2xl shadow p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={finale.imageUrl}
            alt={finale.title}
            className="rounded-xl w-full md:w-72 h-44 object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-900">{finale.title}</h2>
              <span className="text-xs text-red-500 flex items-center gap-1">
                <span className="text-lg">⏰</span>
                Countdown: {countdown}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{finale.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-2">
              <div>
                <span className="font-semibold text-gray-900">Date &amp; Time</span>
                <div>{new Date(`${finale.date}T${finale.time}`).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })} EAT</div>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Location</span>
                <div>{finale.location}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Broadcast</span>
                <div>{finale.broadcast}</div>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Voting Closes</span>
                <div>{new Date(finale.voteCloses).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })} EAT</div>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200">
                Vote Now
              </button>
              <button className="bg-[#FFD6D6] hover:bg-[#FFB3B3] text-[#FF5A5F] px-5 py-2 rounded-lg font-semibold transition-all duration-200">
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats, Share, Help */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Voting Statistics */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF5A5F] text-xl">📊</span>
            <span className="font-bold text-gray-900">Voting Statistics</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-extrabold text-[#FF5A5F]">{filteredContestants.reduce((sum, c) => sum + c.votes, 0).toLocaleString()}</div>
              <div className="text-gray-700 text-xs">Total Votes</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#FF5A5F]">47</div>
              <div className="text-gray-700 text-xs">Counties Participating</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#FF5A5F]">18,452</div>
              <div className="text-gray-700 text-xs">Unique Voters</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#FF5A5F]">1,245</div>
              <div className="text-gray-700 text-xs">Votes Today</div>
            </div>
          </div>
        </div>
        {/* Share Results */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF5A5F] text-xl">🔗</span>
            <span className="font-bold text-gray-900">Share Results</span>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            Help your favorite contestant by sharing these results with friends and family.
          </p>
          <div className="flex gap-2 mb-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://crownvote.co.ke/results/miss-kenya-2023`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F3] text-white px-3 py-1 rounded font-semibold text-xs"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://crownvote.co.ke/results/miss-kenya-2023&text=Check%20out%20the%20Miss%20Kenya%202023%20live%20results!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1DA1F2] text-white px-3 py-1 rounded font-semibold text-xs"
            >
              Twitter
            </a>
            <a
              href={`https://wa.me/?text=Check%20out%20the%20Miss%20Kenya%202023%20live%20results!%20https://crownvote.co.ke/results/miss-kenya-2023`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-3 py-1 rounded font-semibold text-xs"
            >
              WhatsApp
            </a>
          </div>
          <input
            type="text"
            readOnly
            value="https://crownvote.co.ke/results/miss-kenya-2023"
            className="w-full px-2 py-1 border border-gray-200 rounded text-xs bg-gray-50"
          />
        </div>
        {/* Need Help */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF5A5F] text-xl">❓</span>
            <span className="font-bold text-gray-900">Need Help?</span>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            Have questions about the voting process or results? We're here to help!
          </p>
          <ul className="mb-4 space-y-1 text-sm">
            <li className="flex items-center gap-2 text-green-600"><span>✔️</span> Secure and transparent voting system</li>
            <li className="flex items-center gap-2 text-green-600"><span>✔️</span> Real-time results and updates</li>
            <li className="flex items-center gap-2 text-green-600"><span>✔️</span> 24/7 customer support</li>
          </ul>
          <div className="flex gap-2">
            <Link href="/about">
              <button className="bg-[#FFE5E5] text-[#FF5A5F] px-4 py-2 rounded font-semibold text-xs hover:bg-[#FFD6D6]">About Us</button>
            </Link>
            <Link href="/contact">
              <button className="bg-[#FFE5E5] text-[#FF5A5F] px-4 py-2 rounded font-semibold text-xs hover:bg-[#FFD6D6]">Contact Us</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollsPage;
