'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from './common/Button';

const navLinks = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Polls', href: '/polls', icon: '🗳️' },
  { name: 'Results', href: '/results', icon: '📊' },
  { name: 'About', href: '/about', icon: 'ℹ️' },
  { name: 'Contact', href: '/contact', icon: '✉️' },
];

const Header = () => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-white shadow-lg px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#FF5A5F]">CrownVote</div>

      {/* Nav Links */}
      <nav className="flex flex-wrap gap-2 md:gap-4 my-3 md:my-0 justify-center">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <Button
              label={link.name}
              variant="secondary"
              className="text-[#FF5A5F] hover:text-[#E31C5F]"
            >
              <span className="mr-1">{link.icon}</span>
              {link.name}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Auth Section */}
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:block">
              Welcome, {user.name}
            </span>
            <Button
              label="Sign Out"
              variant="secondary"
              onClick={handleSignOut}
              className="border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
                variant="secondary"
                className="text-[#FF5A5F] hover:text-[#E31C5F]" label={''}            >
              Sign In
            </Button>
            <Button
                variant="primary" label={''}            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
