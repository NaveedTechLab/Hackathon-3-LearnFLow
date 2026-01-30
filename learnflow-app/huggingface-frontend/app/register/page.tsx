'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RegisterPage() {
  const router = useRouter();
  const [isStudent, setIsStudent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handleRoleChange = (student: boolean) => {
    setIsStudent(student);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Try to register via API
      let user;
      let token;

      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: isStudent ? 'student' : 'teacher',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          user = data.user;
          token = data.token;
          localStorage.setItem('learnflow_token', token);
        } else if (response.status === 400) {
          const data = await response.json();
          setError(data.detail || 'Registration failed');
          setIsLoading(false);
          return;
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        // Fallback to localStorage
        console.log('Using localStorage fallback for registration');

        user = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: isStudent ? 'student' : 'teacher',
          createdAt: new Date().toISOString(),
        };

        const existingUsers = JSON.parse(localStorage.getItem('learnflow_users') || '[]');
        if (existingUsers.find((u: any) => u.email === formData.email)) {
          setError('An account with this email already exists');
          setIsLoading(false);
          return;
        }

        existingUsers.push({ ...user, password: formData.password });
        localStorage.setItem('learnflow_users', JSON.stringify(existingUsers));
      }

      // Set current user session
      localStorage.setItem('learnflow_current_user', JSON.stringify(user));

      // Redirect based on role
      if (isStudent) {
        router.push('/student/dashboard');
      } else {
        router.push('/teacher/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-warmgray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-lg">LF</span>
              </div>
              <span className="ml-3 text-xl font-bold text-warmgray-900">LearnFlow</span>
            </Link>

            <Link
              href="/"
              className="text-warmgray-600 hover:text-teal-600 font-medium text-sm transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-lavender-200/20 rounded-full blur-3xl -z-10" />

          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-soft">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-warmgray-900 mb-2">Create Account</h1>
              <p className="text-warmgray-600">Join our learning community today</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-coral-50 border border-coral-200 rounded-xl flex items-center text-coral-700">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-wellness"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-wellness"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-wellness"
                  placeholder="At least 6 characters"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-wellness"
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-warmgray-700 mb-3">
                  I am a
                </label>
                <div className="flex gap-3 p-1.5 bg-warmgray-100 rounded-full">
                  <button
                    type="button"
                    onClick={() => handleRoleChange(true)}
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isStudent
                        ? 'bg-teal-600 text-white shadow-soft'
                        : 'text-warmgray-600 hover:text-warmgray-900'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Student
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange(false)}
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      !isStudent
                        ? 'bg-lavender-600 text-white shadow-soft'
                        : 'text-warmgray-600 hover:text-warmgray-900'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Teacher
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                  isStudent
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-lavender-600 hover:bg-lavender-700 text-white'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-warmgray-600">
                Already have an account?{' '}
                <Link href="/" className="font-medium text-teal-600 hover:text-teal-700">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
