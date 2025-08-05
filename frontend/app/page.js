'use client';

import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
          <div className="h-4 w-32 bg-blue-200 rounded"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome to Blogosphere
          </h1>
          <p className="text-gray-600 text-lg">
            Discover, share, and connect through inspiring stories and ideas.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Link
            href="/posts"
            className="inline-block w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Explore Posts
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <Link
                href="/posts/create"
                className="px-6 py-2 rounded-lg border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Create Post
              </Link>
              <LogoutButton className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors" />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 rounded-lg border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {user && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-500">
              Logged in as <span className="font-medium text-blue-600">{user.username}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}