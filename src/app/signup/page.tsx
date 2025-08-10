"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const res = await fetch('http://127.0.0.1:8000/api/users/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Registration successful!');
      router.push('/signin');
    } else {
      setError(data.detail || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#FF5A5F]">Sign Up to Vote</h1>
        {error && <div className="bg-red-100 text-red-700 rounded p-2 mb-4 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white font-bold py-2 rounded-lg transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="text-[#FF5A5F] font-bold underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
