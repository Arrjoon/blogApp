'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPost, updatePost } from '@/lib/api/apiPost';
import { useAuth } from '@/context/AuthContext';

export default function EditPostPage() {
  const { postId } = useParams();
  const router = useRouter();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    getPost(postId)
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch post:', err);
        setLoading(false);
      });
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost(postId, { title, content });
      router.push(`/posts/${postId}`);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading post...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Edit Your Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
