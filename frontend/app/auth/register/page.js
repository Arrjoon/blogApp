'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register as registerAPI } from '@/lib/api/apiAuth';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // if you want email
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const data = await registerAPI({ username, password, email });
      


      toast.success('Registration successful!');
      router.push('/auth/login');
    } catch (error) {
       console.log("Registration error:", error);
        if (error.response?.data) {
            console.log("Server response:", error.response.data);
            toast.error(JSON.stringify(error.response.data));
        } else {
            toast.error("Registration failed.");
        }
    }
  };

  return (
    <div className="p-6">
      <h1>Register</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="block border p-2 my-2"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="block border p-2 my-2"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="block border p-2 my-2"
      />
      <button onClick={handleRegister} className="bg-green-500 px-6 py-2 text-white">
        Register
      </button>
    </div>
  );
}
