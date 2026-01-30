'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Module = {
  id: string;
  name: string;
  description: string;
  masteryLevel: number; // 0-100
  progress: number; // 0-100
  status: 'locked' | 'in-progress' | 'completed';
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [modules, setModules] = useState<Module[]>([
    {
      id: 'mod1',
      name: 'Python Basics',
      description: 'Variables, data types, operators, input/output',
      masteryLevel: 85,
      progress: 100,
      status: 'completed'
    },
    {
      id: 'mod2',
      name: 'Control Flow',
      description: 'Conditional statements, loops, break/continue',
      masteryLevel: 65,
      progress: 75,
      status: 'in-progress'
    },
    {
      id: 'mod3',
      name: 'Functions',
      description: 'Defining functions, parameters, return values',
      masteryLevel: 30,
      progress: 40,
      status: 'in-progress'
    },
    {
      id: 'mod4',
      name: 'Data Structures',
      description: 'Lists, tuples, dictionaries, sets',
      masteryLevel: 0,
      progress: 0,
      status: 'locked'
    },
    {
      id: 'mod5',
      name: 'Object-Oriented Programming',
      description: 'Classes, objects, inheritance, polymorphism',
      masteryLevel: 0,
      progress: 0,
      status: 'locked'
    },
    {
      id: 'mod6',
      name: 'File Operations',
      description: 'Reading/writing files, CSV, JSON',
      masteryLevel: 0,
      progress: 0,
      status: 'locked'
    },
    {
      id: 'mod7',
      name: 'Error Handling',
      description: 'Try/except blocks, exception types, debugging',
      masteryLevel: 0,
      progress: 0,
      status: 'locked'
    },
    {
      id: 'mod8',
      name: 'Libraries & APIs',
      description: 'Installing packages, using APIs, virtual environments',
      masteryLevel: 0,
      progress: 0,
      status: 'locked'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, activity: 'Completed "Loops in Python" quiz', timestamp: '2026-01-15 14:30', score: 85 },
    { id: 2, activity: 'Submitted "Function Practice" exercise', timestamp: '2026-01-15 12:15', result: 'Passed' },
    { id: 3, activity: 'Asked "How do I use list comprehensions?"', timestamp: '2026-01-15 10:45', response: 'Explained' }
  ]);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('learnflow_current_user');
    if (!currentUser) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.role !== 'student') {
      router.push('/teacher/dashboard');
      return;
    }

    setUser(parsedUser);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('learnflow_current_user');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative">
        {/* Responsive Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">LF</span>
                </div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <span className="hidden sm:inline">LearnFlow </span>Dashboard
                </h1>
              </div>

              {/* Desktop User Menu */}
              <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100/50 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-semibold">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base hidden md:inline">{user?.name?.split(' ')[0] || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>

              {/* Mobile User Avatar & Logout */}
              <div className="flex sm:hidden items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h2>
            <p className="text-sm sm:text-base text-gray-600">Continue your Python learning journey where you left off</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Progress Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Your Learning Progress
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md border border-white/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-blue-800">Overall Mastery</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mt-0.5 sm:mt-1">72%</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md border border-white/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-green-800">Modules Completed</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mt-0.5 sm:mt-1">2/8</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md border border-white/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-yellow-800">Current Streak</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 mt-0.5 sm:mt-1">5 days</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md border border-white/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-purple-800">Hours Learned</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mt-0.5 sm:mt-1">24</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Learning Modules
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className={`bg-white/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border transition-all duration-300 hover:shadow-lg ${
                        module.status === 'locked'
                          ? 'opacity-60 border-gray-200'
                          : module.status === 'in-progress'
                            ? 'border-blue-200 shadow-md'
                            : 'border-green-200 shadow-md'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800">{module.name}</h4>
                            {module.status === 'completed' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="hidden xs:inline">Completed</span>
                                <span className="xs:hidden">Done</span>
                              </span>
                            )}
                            {module.status === 'in-progress' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="hidden xs:inline">In Progress</span>
                                <span className="xs:hidden">Active</span>
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{module.description}</p>

                          <div className="flex items-center justify-between mb-1 sm:mb-2 text-xs sm:text-sm">
                            <span className="font-medium text-gray-700">Progress: {module.progress}%</span>
                            <span className="font-medium text-gray-700">Mastery: {module.masteryLevel}%</span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${
                                module.status === 'completed' ? 'bg-green-500' :
                                module.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <Link
                          href={`/student/learn?module=${module.id}`}
                          className={`w-full sm:w-auto sm:ml-4 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 text-center ${
                            module.status === 'locked'
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : module.status === 'completed'
                                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md'
                                : module.status === 'in-progress'
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md'
                                  : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md'
                          }`}
                          prefetch={false}
                        >
                          {module.status === 'completed' ? 'Review' :
                           module.status === 'in-progress' ? 'Continue' : 'Start'}
                        </Link>
                      </div>

                      <div className="mt-2 sm:mt-3 flex items-center">
                        <span className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium ${
                          module.masteryLevel >= 90 ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' :
                          module.masteryLevel >= 70 ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' :
                          module.masteryLevel >= 40 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800' :
                          'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                        }`}>
                          {module.masteryLevel >= 90 ? '⭐ Mastered' :
                           module.masteryLevel >= 70 ? '💪 Proficient' :
                           module.masteryLevel >= 40 ? '📚 Learning' : '🌱 Beginner'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Recent Activity */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Activity
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="border-b border-gray-100 pb-3 sm:pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">{activity.activity}</p>
                          <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{activity.timestamp}</p>
                          {activity.score && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                              Score: {activity.score}%
                            </span>
                          )}
                          {activity.result && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {activity.result}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Continue Learning */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Continue Learning
                </h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="font-semibold text-sm sm:text-base">Control Flow Module</p>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">75% complete • 65% mastery</p>
                  <div className="w-full bg-white/30 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                    <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <Link
                  href="/student/learn?module=mod2"
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105 block text-center"
                  prefetch={false}
                >
                  Continue Learning
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href="/student/quiz"
                    className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 hover:border-blue-200"
                    prefetch={false}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-sm sm:text-base text-gray-800">Take a Quiz</span>
                  </Link>

                  <Link
                    href="/student/progress"
                    className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-teal-50 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 hover:border-green-200"
                    prefetch={false}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-sm sm:text-base text-gray-800">View Progress</span>
                  </Link>

                  <Link
                    href="/student/chat"
                    className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 hover:border-purple-200"
                    prefetch={false}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="font-medium text-sm sm:text-base text-gray-800">Chat with Tutor</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}