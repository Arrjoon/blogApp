'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register as registerAPI } from '@/lib/api/apiAuth';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!email.includes('@') || !email.includes('.')) {
        toast.error('Please enter a valid email address.');
        return;
      }
      const data = await registerAPI({ username, password, email });

      toast.success('Registration successful!');
      router.push('/auth/login');
    } catch (error) {
      console.log("Registration error:", error);
      if (error.response?.data) {
        toast.error(
          typeof error.response.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response.data)
        );
      } else {
        toast.error("Registration failed.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/auth/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </main>
  );
}
