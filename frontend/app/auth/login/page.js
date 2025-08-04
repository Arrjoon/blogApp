'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginAPI } from "@/lib/api/apiAuth";
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginAPI({ username, password });
      login(data.token, data.user);
      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      console.log("Login error:", error);
      toast.error('Invalid username or password');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/auth/register')}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
