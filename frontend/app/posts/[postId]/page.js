'use client';

import { getPost } from '@/lib/api/apiPost';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostDetailPage() {
  const { postId } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost(postId)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading post...</p>;
  }

  if (!post) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">Post not found</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-6">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 hover:underline"
      >
        ← Back to posts
      </button>

      <div className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">By {post.author}</p>
        <div className="text-gray-700 whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </div>
  );
}