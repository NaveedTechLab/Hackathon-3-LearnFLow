'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      let user;
      let token;

      // Try API login first
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          user = data.user;
          token = data.token;
          localStorage.setItem('learnflow_token', token);
        } else if (response.status === 401) {
          setLoginError('Invalid email or password');
          setIsLoggingIn(false);
          return;
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        // Fallback to localStorage
        console.log('Using localStorage fallback for login');
        const users = JSON.parse(localStorage.getItem('learnflow_users') || '[]');
        user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword);

        if (!user) {
          setLoginError('Invalid email or password');
          setIsLoggingIn(false);
          return;
        }
      }

      // Check if role matches
      if (user.role !== role) {
        setLoginError(`This account is registered as a ${user.role}. Please select the correct role.`);
        setIsLoggingIn(false);
        return;
      }

      // Set current user session
      localStorage.setItem('learnflow_current_user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }));

      // Redirect based on role
      if (role === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/teacher/dashboard');
      }
    } catch (err) {
      setLoginError('Something went wrong. Please try again.');
      setIsLoggingIn(false);
    }
  };

  const categories = [
    { name: 'Python Basics', color: 'teal', icon: '🐍' },
    { name: 'Data Science', color: 'lavender', icon: '📊' },
    { name: 'Web Dev', color: 'coral', icon: '🌐' },
    { name: 'AI & ML', color: 'sage', icon: '🤖' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths that adapt to your unique pace and style',
      color: 'teal',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Interactive Coding',
      description: 'Practice with real-time code execution and instant feedback',
      color: 'lavender',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: 'Expert Community',
      description: 'Connect with mentors and peers who support your learning journey',
      color: 'coral',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Verified Certificates',
      description: 'Earn industry-recognized credentials that boost your career',
      color: 'sage',
    },
  ];

  const courses = [
    {
      title: 'Python for Beginners',
      description: 'Start your coding journey with the most beginner-friendly language',
      duration: '8 weeks',
      level: 'Beginner',
      rating: 4.9,
      students: '15,000+',
      image: '🐍',
      color: 'teal',
    },
    {
      title: 'Data Science Essentials',
      description: 'Master data analysis, visualization, and machine learning fundamentals',
      duration: '12 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: '12,000+',
      image: '📊',
      color: 'lavender',
    },
    {
      title: 'Full Stack Web Development',
      description: 'Build modern web applications from frontend to backend',
      duration: '16 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: '10,000+',
      image: '🌐',
      color: 'coral',
    },
  ];

  const testimonials = [
    {
      quote: "LearnFlow transformed my career. The AI tutor felt like having a personal mentor available 24/7.",
      name: "Sarah Ahmed",
      role: "Software Developer",
      avatar: "SA",
    },
    {
      quote: "The interactive coding exercises made learning Python actually fun. I went from zero to building apps in weeks.",
      name: "Ali Hassan",
      role: "Data Analyst",
      avatar: "AH",
    },
    {
      quote: "Finally, a learning platform that adapts to my pace. No more feeling left behind or bored.",
      name: "Fatima Khan",
      role: "Web Developer",
      avatar: "FK",
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-warmgray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white font-bold text-lg">LF</span>
                </div>
                <span className="ml-3 text-xl font-bold text-warmgray-900">LearnFlow</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'Courses', href: '/courses' },
                { name: 'About', href: '/about' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    i === 0
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-warmgray-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/register"
                className="text-warmgray-700 hover:text-teal-700 font-medium text-sm transition-colors px-4 py-2"
              >
                Sign Up
              </Link>
              <a
                href="#login"
                className="bg-teal-600 text-white px-5 py-2.5 rounded-full hover:bg-teal-700 transition-all duration-300 font-medium text-sm shadow-soft hover:shadow-md"
              >
                Login
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-warmgray-700 hover:text-teal-600 p-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-warmgray-100 bg-white/95 backdrop-blur-md absolute left-0 right-0 shadow-soft-lg">
              <div className="flex flex-col space-y-1 px-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Courses', href: '/courses' },
                  { name: 'About', href: '/about' },
                  { name: 'Resources', href: '/resources' },
                  { name: 'Contact', href: '/contact' },
                ].map((item, i) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                      i === 0 ? 'bg-teal-50 text-teal-700' : 'text-warmgray-700 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-2 flex flex-col space-y-3 border-t border-warmgray-100">
                  <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium px-4 py-2">
                    Sign Up
                  </Link>
                  <a
                    href="#login"
                    className="bg-teal-600 text-white px-4 py-3 rounded-xl text-center hover:bg-teal-700 transition-colors font-medium"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* Decorative blobs */}
        <div className="blob-teal w-96 h-96 -top-48 -left-48 opacity-60" />
        <div className="blob-lavender w-80 h-80 top-20 right-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse" />
                AI-Powered Learning Platform
              </div>
              <h1 className="text-warmgray-900 mb-6 text-balance">
                Your Journey to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
                  Programming Mastery
                </span>{' '}
                Starts Here
              </h1>
              <p className="text-lg md:text-xl text-warmgray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience personalized learning with AI tutors that understand your pace, answer your questions, and guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register" className="btn-primary inline-flex items-center justify-center">
                  Start Learning Free
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a href="#courses" className="btn-secondary inline-flex items-center justify-center">
                  Explore Courses
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-warmgray-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  50,000+ Students
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  95% Success Rate
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  24/7 Support
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-soft-lg relative z-10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft animate-float">
                    <span className="text-4xl">🎓</span>
                  </div>
                  <h3 className="text-xl font-bold text-warmgray-900 mb-2">Start Your Learning Journey</h3>
                  <p className="text-warmgray-600">Interactive Python tutoring with real-time AI feedback</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '50K+', label: 'Students', bg: 'bg-teal-50', text: 'text-teal-700' },
                    { value: '100+', label: 'Courses', bg: 'bg-lavender-50', text: 'text-lavender-700' },
                    { value: '95%', label: 'Success', bg: 'bg-coral-50', text: 'text-coral-700' },
                    { value: '24/7', label: 'Support', bg: 'bg-sage-50', text: 'text-sage-700' },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.bg} p-4 rounded-2xl text-center`}>
                      <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
                      <div className="text-sm text-warmgray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-lavender-200 rounded-2xl -z-10 opacity-50" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-200 rounded-2xl -z-10 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`category-pill category-pill-${cat.color} flex items-center gap-2`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-wellness bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-warmgray-900 mb-4">Why Choose LearnFlow?</h2>
            <p className="text-lg text-warmgray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven learning methods to create an experience that's effective and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="wellness-card text-center group">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    feature.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                    feature.color === 'lavender' ? 'bg-lavender-100 text-lavender-600' :
                    feature.color === 'coral' ? 'bg-coral-100 text-coral-600' :
                    'bg-sage-100 text-sage-600'
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-warmgray-900 mb-3">{feature.title}</h3>
                <p className="text-warmgray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section-wellness bg-gradient-wellness">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-warmgray-900 mb-4">Popular Courses</h2>
            <p className="text-lg text-warmgray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted programs designed to take you from beginner to professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.title} className="wellness-card group">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                      course.color === 'teal' ? 'bg-teal-100' :
                      course.color === 'lavender' ? 'bg-lavender-100' :
                      'bg-coral-100'
                    }`}
                  >
                    {course.image}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                      course.color === 'lavender' ? 'bg-lavender-100 text-lavender-700' :
                      'bg-coral-100 text-coral-700'
                    }`}
                  >
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-warmgray-900 mb-2">{course.title}</h3>
                <p className="text-warmgray-600 text-sm mb-4 leading-relaxed">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-warmgray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.rating}
                  </span>
                  <span>{course.students}</span>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                    course.color === 'teal' ? 'bg-teal-600 hover:bg-teal-700 text-white' :
                    course.color === 'lavender' ? 'bg-lavender-600 hover:bg-lavender-700 text-white' :
                    'bg-coral-600 hover:bg-coral-700 text-white'
                  }`}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#" className="btn-secondary inline-flex items-center">
              View All Courses
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-wellness bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-warmgray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg text-warmgray-600 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers with LearnFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="wellness-card">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-warmgray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-warmgray-900">{testimonial.name}</div>
                    <div className="text-sm text-warmgray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="section-wellness bg-gradient-wellness">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-soft-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-warmgray-900 mb-2">Welcome Back</h2>
              <p className="text-warmgray-600">Access your personalized learning dashboard</p>
            </div>

            <div className="flex justify-center gap-2 mb-8 bg-warmgray-100 p-1.5 rounded-full">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  role === 'student'
                    ? 'bg-teal-600 text-white shadow-soft'
                    : 'text-warmgray-600 hover:text-warmgray-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`flex-1 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  role === 'teacher'
                    ? 'bg-lavender-600 text-white shadow-soft'
                    : 'text-warmgray-600 hover:text-warmgray-900'
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="mb-6 p-4 bg-coral-50 border border-coral-200 rounded-xl flex items-center text-coral-700">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  required
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }}
                  className="input-wellness"
                  placeholder="you@example.com"
                  disabled={isLoggingIn}
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-warmgray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  required
                  value={loginPassword}
                  onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                  className="input-wellness"
                  placeholder="Enter your password"
                  disabled={isLoggingIn}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-warmgray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-warmgray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                  role === 'student'
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-lavender-600 hover:bg-lavender-700 text-white'
                } ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoggingIn ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-warmgray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Courses
          </h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get notified about new courses, tips, and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-teal-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="bg-white text-teal-700 px-8 py-3 rounded-full font-medium hover:bg-teal-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warmgray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">LF</span>
                </div>
                <span className="ml-3 text-lg font-bold">LearnFlow</span>
              </div>
              <p className="text-warmgray-400 text-sm leading-relaxed mb-6">
                Empowering the next generation of developers with AI-powered learning experiences that adapt to your unique journey.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-warmgray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'facebook' && (
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      )}
                      {social === 'twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                      {social === 'linkedin' && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      )}
                      {social === 'instagram' && (
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Courses', 'Instructors', 'Blog', 'Careers'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-warmgray-400 hover:text-teal-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Programs</h3>
              <ul className="space-y-3">
                {['Python Programming', 'Data Science', 'Web Development', 'Machine Learning', 'Cyber Security'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-warmgray-400 hover:text-teal-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-warmgray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Education Street, Karachi, Pakistan
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@learnflow.edu.pk
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +92 300 1234567
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-warmgray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-warmgray-400">
              &copy; 2026 LearnFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-warmgray-400 hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-warmgray-400 hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-warmgray-400 hover:text-teal-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
