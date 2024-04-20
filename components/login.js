"use client"
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn,useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {toast} from 'sonner'
export default function LoginComponent() {

  const [isVisible, setIsVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.role === "department") {
      router.replace("/department");
    }
    
    if (session?.user?.role === "admin") {
      router.replace("/admin");      
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        userId,
        password,
        redirect: false,
      });
      
      if (result.ok) {
        console.log('Login Successful !');
        toast.success('Login Successful');
      }
    } catch (error) {
      console.error('Failed to login', error);
      toast.error('Failed to login');
    }
  };

  // Define handleCancel function to clear all fields in the form
  const handleCancel = () => {
    setUserId('');
    setPassword('');
  };

  // Return JSX for the LoginComponent
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="w-full p-9 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <Input
            type="text"
            variant="bordered"
            label="User Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mb-4"
          />
          <Input
            label="Password"
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {/* Eye icon */}
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {/* Eye slash icon */}
                  </svg>
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
            <div className="flex justify-center space-x-4">
            <Button color="default" onClick={handleCancel} className="w-36">
              Cancel
            </Button>
            <Button color="primary" type="submit" className="w-36">
              Login
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
