import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogIn } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('LoginPage: handleSubmit called');
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/pantry');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center dark:bg-slate-1050 p-0">
      <Card className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-10 md:p-12 space-y-8 border-0 shadow-2xl overflow-y-auto max-h-[90vh]">
        <CardHeader className="space-y-3 text-center p-0 mb-8">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 mb-5">
            <LogIn className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-4xl font-bold text-slate-800 dark:text-slate-100">Welcome to Pantry Pal</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-lg">Sign in to access your pantry and recipes.</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8 p-0">
          {error && (
            <div className="bg-red-100 dark:bg-red-500/20 border-l-4 border-red-500 dark:border-red-400 rounded-md p-4 text-center">
              <p className="text-base font-medium text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
          <div className="space-y-3">
            <Label htmlFor="username" className="text-base font-medium text-slate-700 dark:text-slate-300">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="e.g., pantrymaster"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-14 text-lg px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-base font-medium text-slate-700 dark:text-slate-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-14 text-lg px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-8 p-0 pt-8">
          <Button type="submit" className="w-full h-14 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 text-black" disabled={loading} onClick={handleSubmit}>
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
            ) : (
              'Sign In'
            )}
          </Button>
          <p className="text-center text-base text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage; 