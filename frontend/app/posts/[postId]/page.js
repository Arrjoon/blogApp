'use client';

import { getPost } from '@/lib/api/apiPost';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(postId)
      .then((data) => setPost(data))
      .catch(console.error);
  }, [postId]);

  if (!post)
    return <p className="text-center text-gray-500 mt-10">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-4">By {post.author}</p>
        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </div>
  );
}
