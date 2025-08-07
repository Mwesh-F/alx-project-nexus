'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Polls', href: '/polls' },
  { name: 'Results', href: '/results' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="bg-white shadow-lg p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="text-2xl font-bold text-[#4F46E5]">CrownVote</div>
      
      <nav className="flex gap-4 my-2 md:my-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#4F46E5] hover:text-[#3730A3] hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <input
        type="text"
        placeholder="Search polls..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 my-2 md:my-0 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
      />
      
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user.name}</span>
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 border border-[#4F46E5] text-[#4F46E5] rounded-lg text-sm font-medium hover:bg-[#4F46E5] hover:text-white transition-colors duration-200"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin">
              <button className="px-4 py-2 text-[#4F46E5] hover:text-[#3730A3] text-sm font-medium transition-colors duration-200">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-sm font-medium rounded-lg hover:from-[#3730A3] hover:to-[#6D28D9] transition-all duration-200">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
