'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ModuleProgress = {
  id: string;
  name: string;
  mastery: number;
  completed: number;
  total: number;
  lastActivity: string;
};

export default function ProgressPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const overallStats = {
    totalMastery: 72,
    totalHours: 24,
    streak: 5,
    quizzesTaken: 12,
    exercisesCompleted: 45,
    rank: 'Intermediate'
  };

  const moduleProgress: ModuleProgress[] = [
    { id: 'mod1', name: 'Python Basics', mastery: 92, completed: 10, total: 10, lastActivity: '2 days ago' },
    { id: 'mod2', name: 'Control Flow', mastery: 75, completed: 8, total: 12, lastActivity: '1 day ago' },
    { id: 'mod3', name: 'Functions', mastery: 45, completed: 5, total: 15, lastActivity: 'Today' },
    { id: 'mod4', name: 'Data Structures', mastery: 30, completed: 3, total: 18, lastActivity: '3 days ago' },
    { id: 'mod5', name: 'OOP', mastery: 0, completed: 0, total: 20, lastActivity: 'Not started' },
    { id: 'mod6', name: 'File Operations', mastery: 0, completed: 0, total: 10, lastActivity: 'Not started' },
  ];

  const recentAchievements = [
    { id: 1, title: 'Quiz Master', description: 'Scored 100% on 3 quizzes', icon: '🏆', date: '2 days ago' },
    { id: 2, title: 'Code Warrior', description: 'Completed 10 exercises in a day', icon: '⚔️', date: '5 days ago' },
    { id: 3, title: 'Fast Learner', description: 'Finished a module in record time', icon: '🚀', date: '1 week ago' },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 },
  ];

  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/student/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">My Progress</span>
            </Link>
            <Link
              href="/student/dashboard"
              className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-blue-600">{overallStats.totalMastery}%</div>
            <div className="text-sm text-gray-500">Overall Mastery</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-green-600">{overallStats.totalHours}h</div>
            <div className="text-sm text-gray-500">Total Hours</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-orange-600">{overallStats.streak}</div>
            <div className="text-sm text-gray-500">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-purple-600">{overallStats.quizzesTaken}</div>
            <div className="text-sm text-gray-500">Quizzes Taken</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-teal-600">{overallStats.exercisesCompleted}</div>
            <div className="text-sm text-gray-500">Exercises Done</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-indigo-600">{overallStats.rank}</div>
            <div className="text-sm text-gray-500">Current Rank</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Progress */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Module Progress</h2>
            <div className="space-y-4">
              {moduleProgress.map((module) => (
                <div key={module.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{module.name}</h3>
                      <p className="text-sm text-gray-500">{module.completed}/{module.total} lessons completed</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      module.mastery >= 80 ? 'bg-green-100 text-green-800' :
                      module.mastery >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      module.mastery > 0 ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {module.mastery}% Mastery
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        module.mastery >= 80 ? 'bg-green-500' :
                        module.mastery >= 50 ? 'bg-yellow-500' :
                        module.mastery > 0 ? 'bg-orange-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${module.mastery}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400">Last activity: {module.lastActivity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Activity</h2>
              <div className="flex items-end justify-between h-32">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(day.hours / 4) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 text-sm text-gray-600">
                Total this week: {weeklyActivity.reduce((acc, d) => acc + d.hours, 0)} hours
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      <p className="text-xs text-gray-400">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
