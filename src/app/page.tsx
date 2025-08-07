'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 text-center">
        <p className="font-medium text-sm md:text-base">
          Miss Kenya 2023 voting is now open! Cast your vote before June 30th
        </p>
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/miss12.jpg"
            alt="Miss Kenya contestants"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Transparent Voting for Miss Kenya Pageants
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              CrownVote brings integrity and excitement to pageant voting with our secure, real-time platform designed specifically for Kenya's beauty pageants.
            </p>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/polls"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Vote Now
              </Link>
              <Link 
                href="/about"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose CrownVote Section */}
      <div className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CrownVote?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform revolutionizes pageant voting in Kenya with transparency, security, and engagement at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch voting happen live with our transparent counting system that updates in real-time, ensuring complete fairness.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.0 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Voting</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform uses advanced security measures to prevent fraud and ensure each vote is legitimate and counted correctly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contestant Profiles</h3>
              <p className="text-gray-600 leading-relaxed">
                Get to know each contestant with detailed profiles, photos, and videos before casting your important vote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
