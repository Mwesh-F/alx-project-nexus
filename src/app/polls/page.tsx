'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { voteForContestant, resetVotes, addContestant } from '../../store/contestantsSlice';
import { addVote } from '../../store/votesSlice';
import { useForm as useContestantForm } from 'react-hook-form';
import { z as zContestant } from 'zod';
import { zodResolver as zodContestantResolver } from '@hookform/resolvers/zod';

const PollsPage = () => {
  const [activeTab, setActiveTab] = useState<'voter' | 'admin'>('voter');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [newContestant, setNewContestant] = useState({ name: '', bio: '', photoUrl: '' });
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const dispatch = useDispatch();

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

  const onVoterLogin = (data: VoterFormData) => {
    const found = allowedVoters.find(
      (v) => v.email === data.email && v.password === data.password
    );
    if (found) {
      setIsAuthenticated(true);
      alert('Login successful! You can now vote.');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('adminUsername');
    const password = formData.get('adminPassword');
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setIsAdminAuthenticated(true);
      alert('Admin login successful!');
    } else {
      alert('Invalid admin credentials.');
    }
  };

  const handleAddContestant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContestant(newContestant));
    setNewContestant({ name: '', bio: '', photoUrl: '' });
  };

  const allowedVoters = [
    { email: 'voter1@example.com', password: 'password123' },
    { email: 'voter2@example.com', password: 'password456' },
  ];

  const adminCredentials = {
    username: 'admin',
    password: 'adminpass123',
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
                      Admin credentials required for access
                    </p>
                  </div>
                </form>
              )}

              {/* Admin Authenticated View */}
              {activeTab === 'admin' && isAdminAuthenticated && (
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">Welcome, Admin!</h2>
                  <p className="text-gray-700 mb-6">You now have access to manage polls and view results.</p>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white rounded-xl shadow">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">Contestant</th>
                          <th className="py-2 px-4 border-b">Votes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contestants.map(c => (
                          <tr key={c.id}>
                            <td className="py-2 px-4 border-b">{c.name}</td>
                            <td className="py-2 px-4 border-b">{c.votes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={() => dispatch(resetVotes())}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                  >
                    Reset All Votes
                  </button>
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
    </div>
  );
};

export default PollsPage;
