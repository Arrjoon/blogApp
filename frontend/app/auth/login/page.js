'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginAPI } from "@/lib/api/apiAuth";
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';


export default function LoginPage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () =>
    {
        try{
            const data = await loginAPI({username,password})
            login(data.token, data.user);
            toast.success('Login successful!'); 
            router.push('/');
            }
        catch(error){
            console.log("Login error:", error);
            toast.success('Invalid username or password'); 
        }

    }
    
    return(
        <>
            <div className="p-6">
                <h1>Login</h1>
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username" className="block border p-2 my-2"/>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"className="block border p-2 my-2" />
                <button onClick={handleLogin} className="bg-blue-500 px-6 py-2 text-white" >Login</button>
            </div>
        </>
    )
            
};