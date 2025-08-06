'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { voteForContestant } from '../../store/contestantsSlice';
import { addVote } from '../../store/votesSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PollsPage = () => {
  const [activeTab, setActiveTab] = useState<'voter' | 'admin'>('voter');
  const contestants = useSelector((state: RootState) => state.contestants.contestants);
  const dispatch = useDispatch();

  const handleVote = (id: string) => {
    dispatch(voteForContestant(id));
    dispatch(addVote(id));
  };

  const voterSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  type VoterFormData = z.infer<typeof voterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VoterFormData>({
    resolver: zodResolver(voterSchema),
  });

  const onVoterLogin = (data: VoterFormData) => {
    // TODO: Authenticate voter here
    alert(`Logged in as: ${data.email}`);
  };

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
              {activeTab === 'admin' && (
                <div className="space-y-6">
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
                        placeholder="Enter admin password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                      />
                    </div>
                    
                    <button className="group w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      <span className="group-hover:scale-105 transition-transform duration-300">Access Admin Panel</span>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Admin credentials required for access
                    </p>
                  </div>
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
      </div>
    </div>
  );
};

export default PollsPage;
