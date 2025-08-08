"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch('http://127.0.0.1:8000/api/users/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      alert('Login successful!');
      router.push("/polls");
    } else {
      setError(data.detail || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#FF5A5F]">Sign In to Vote</h1>
        {error && <div className="bg-red-100 text-red-700 rounded p-2 mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#FF5A5F] hover:bg-[#E31C5F] text-white font-bold py-2 rounded-lg transition-all duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#FF5A5F] font-bold underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
