'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-pink-600">CrownVote</Link>
      <div className="space-x-4">
        <Link href="/about" className="hover:text-pink-500">About</Link>
        <Link href="/polls" className="hover:text-pink-500">Polls</Link>
        <Link href="/contact" className="hover:text-pink-500">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
