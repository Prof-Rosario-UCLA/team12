import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserPlus } from 'lucide-react';

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

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(username, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-1050 p-0">
      <Card className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-10 md:p-12 space-y-4 border-0 shadow-2xl overflow-y-auto max-h-[90vh]">
        <CardHeader className="space-y-2 text-center p-0 mb-4">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20 mb-3">
            <UserPlus className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-4xl font-bold text-slate-800 dark:text-slate-100">Create your Account</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-lg">Join Pantry Pal today!</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 p-0">
          {error && (
            <div className="bg-red-100 dark:bg-red-500/20 border-l-4 border-red-500 dark:border-red-400 rounded-md p-4 text-center">
              <p className="text-base font-medium text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-base font-medium text-slate-700 dark:text-slate-300">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-14 text-lg px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium text-slate-700 dark:text-slate-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-14 text-lg px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base font-medium text-slate-700 dark:text-slate-300">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-14 text-lg px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 p-0 pt-4">
          <Button type="submit" className="w-full h-14 text-lg font-semibold rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700 text-black" disabled={loading} onClick={handleSubmit}>
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
            ) : (
              'Create Account'
            )}
          </Button>
          <p className="text-center text-base text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage; 