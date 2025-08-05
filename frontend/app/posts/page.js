'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deletePost, fetchPosts } from '@/lib/api/apiPost';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext'; // Make sure path is correct

export default function PostListPage() {
  const { token, user } = useAuth(); // ← Get auth state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function handleDelete(postId) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId); // Assumes token is handled in deletePost
        toast.success('Post deleted successfully!');
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Failed to delete post:', err);
        toast.error('Error deleting post');
      }
    }
  }

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                <div className="h-2 bg-gray-200 rounded col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Blog Posts</h1>
          {token ? (
            <Link
              href="/posts/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Create New Post
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No posts</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
            {token && (
              <div className="mt-6">
                <Link
                  href="/posts/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Post
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {post.category || 'General'}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {post.content || 'No content available'}
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Posted on {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View
                    </Link>
                    {token && (
                      <>
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="text-sm font-medium text-green-600 hover:text-green-500"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
