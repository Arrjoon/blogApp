'use client';

import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';


export default function Home() {
  const { user } = useAuth();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
 
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Blog</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Discover posts, read articles, and stay up to date with the latest content.
      </p>

      <Link
        href="/posts"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-700 transition"
      >
        View All Posts
      </Link>

      

       {user ? (
          <LogoutButton />
        ) : (
          <Link
            href="/auth/login"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Login
          </Link>
        )}
    </main>
  );
}
