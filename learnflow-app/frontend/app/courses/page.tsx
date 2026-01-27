'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Python Fundamentals',
      description: 'Learn Python from scratch. Variables, data types, operators, and basic syntax.',
      level: 'beginner',
      duration: '4 weeks',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      image: '🐍',
      color: 'bg-teal-500',
    },
    {
      id: 2,
      title: 'Control Flow & Loops',
      description: 'Master if statements, for loops, while loops, and conditional logic.',
      level: 'beginner',
      duration: '3 weeks',
      lessons: 18,
      students: 980,
      rating: 4.7,
      image: '🔄',
      color: 'bg-sage-500',
    },
    {
      id: 3,
      title: 'Functions & Modules',
      description: 'Create reusable code with functions, parameters, return values, and modules.',
      level: 'intermediate',
      duration: '4 weeks',
      lessons: 22,
      students: 756,
      rating: 4.9,
      image: '⚡',
      color: 'bg-lavender-500',
    },
    {
      id: 4,
      title: 'Object-Oriented Programming',
      description: 'Classes, objects, inheritance, polymorphism, and encapsulation in Python.',
      level: 'intermediate',
      duration: '5 weeks',
      lessons: 30,
      students: 645,
      rating: 4.8,
      image: '🏗️',
      color: 'bg-coral-500',
    },
    {
      id: 5,
      title: 'Data Structures',
      description: 'Lists, dictionaries, sets, tuples, and when to use each data structure.',
      level: 'intermediate',
      duration: '4 weeks',
      lessons: 26,
      students: 823,
      rating: 4.7,
      image: '📊',
      color: 'bg-teal-600',
    },
    {
      id: 6,
      title: 'File Handling & APIs',
      description: 'Read/write files, work with JSON, and consume REST APIs with Python.',
      level: 'advanced',
      duration: '3 weeks',
      lessons: 20,
      students: 432,
      rating: 4.9,
      image: '📁',
      color: 'bg-sage-600',
    },
    {
      id: 7,
      title: 'Error Handling & Debugging',
      description: 'Try-except blocks, custom exceptions, and debugging techniques.',
      level: 'intermediate',
      duration: '2 weeks',
      lessons: 14,
      students: 567,
      rating: 4.6,
      image: '🐛',
      color: 'bg-lavender-600',
    },
    {
      id: 8,
      title: 'Python Projects',
      description: 'Build real-world projects: CLI tools, web scrapers, and automation scripts.',
      level: 'advanced',
      duration: '6 weeks',
      lessons: 35,
      students: 389,
      rating: 4.9,
      image: '🚀',
      color: 'bg-coral-600',
    },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.level === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-warmgray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-warmgray-900">LearnFlow</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'Courses', href: '/courses' },
                { name: 'About', href: '/about' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    item.name === 'Courses'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-warmgray-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Link href="/register" className="text-warmgray-700 hover:text-teal-700 font-medium text-sm">
                Sign Up
              </Link>
              <Link href="/" className="bg-teal-600 text-white px-5 py-2.5 rounded-full hover:bg-teal-700 transition-all font-medium text-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-4">
            Explore Our <span className="text-teal-600">Python Courses</span>
          </h1>
          <p className="text-lg text-warmgray-600 max-w-2xl mx-auto">
            From beginner to advanced, find the perfect course to master Python programming with AI-powered guidance.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white shadow-soft'
                    : 'bg-white text-warmgray-600 hover:bg-teal-50 hover:text-teal-700 border border-warmgray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group"
              >
                <div className={`${course.color} h-32 flex items-center justify-center`}>
                  <span className="text-5xl">{course.image}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    <span className="text-warmgray-400 text-xs">{course.duration}</span>
                  </div>
                  <h3 className="font-semibold text-warmgray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-warmgray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-warmgray-500">
                      <span>{course.lessons} lessons</span>
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-warmgray-700">{course.rating}</span>
                    </div>
                  </div>
                  <Link
                    href="/register"
                    className="mt-4 block w-full text-center bg-teal-50 text-teal-700 py-2.5 rounded-xl font-medium hover:bg-teal-100 transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-teal-100 mb-8">Join thousands of students mastering Python with AI-powered tutoring.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-teal-700 px-8 py-3 rounded-full font-semibold hover:bg-cream-50 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
