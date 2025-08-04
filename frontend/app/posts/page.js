'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deletePost, fetchPosts } from '@/lib/api/apiPost';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  function handleDelete(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId)
        .then(() => {
          alert('Post deleted successfully!');
          router.refresh(); // refresh list
        })
        .catch((err) => {
          console.error('Failed to delete post:', err);
          alert('Error deleting post.');
        });
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
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading posts...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>
        <Link
          href="/posts/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <div className="flex space-x-4 text-sm">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
