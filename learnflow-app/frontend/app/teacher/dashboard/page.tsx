'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Student = {
  id: string;
  name: string;
  currentModule: string;
  masteryPercentage: number;
  lastActive: string;
  status: 'active' | 'struggling' | 'idle';
};

type StruggleAlert = {
  id: string;
  studentId: string;
  studentName: string;
  issue: string;
  timestamp: string;
  resolved: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alex Johnson', currentModule: 'Control Flow', masteryPercentage: 65, lastActive: '2026-01-15 14:30', status: 'active' },
    { id: '2', name: 'Sam Smith', currentModule: 'Functions', masteryPercentage: 42, lastActive: '2026-01-15 13:45', status: 'struggling' },
    { id: '3', name: 'Taylor Brown', currentModule: 'Data Structures', masteryPercentage: 88, lastActive: '2026-01-15 15:15', status: 'active' },
    { id: '4', name: 'Jordan Davis', currentModule: 'Basics', masteryPercentage: 92, lastActive: '2026-01-15 12:20', status: 'idle' },
    { id: '5', name: 'Casey Wilson', currentModule: 'OOP', masteryPercentage: 35, lastActive: '2026-01-15 14:50', status: 'struggling' },
    { id: '6', name: 'Morgan Lee', currentModule: 'Files', masteryPercentage: 76, lastActive: '2026-01-15 15:05', status: 'active' }
  ]);

  const [alerts, setAlerts] = useState<StruggleAlert[]>([
    { id: 'a1', studentId: '2', studentName: 'Sam Smith', issue: 'Stuck on for loop exercise for 15 minutes', timestamp: '2026-01-15 14:25', resolved: false },
    { id: 'a2', studentId: '5', studentName: 'Casey Wilson', issue: 'Repeated the same syntax error 3 times', timestamp: '2026-01-15 14:48', resolved: false }
  ]);

  const [classStats, setClassStats] = useState({
    totalStudents: 24,
    activeStudents: 18,
    averageMastery: 68,
    strugglingStudents: 4
  });

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('learnflow_current_user');
    if (!currentUser) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.role !== 'teacher') {
      router.push('/student/dashboard');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId ? {...alert, resolved: true} : alert
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LF</span>
                  </div>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
                  <p className="text-sm text-gray-500">Welcome, {user?.name || 'Teacher'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{user?.name?.charAt(0).toUpperCase() || 'T'}</span>
                </div>
                <span className="text-gray-700 font-medium">{user?.name?.split(' ')[0] || 'Teacher'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Class Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{classStats.totalStudents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Students</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{classStats.activeStudents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg. Mastery</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{classStats.averageMastery}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.937-1-2.707.333-1.54 2.667-1.937 5.333-1.937 8z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Struggling Students</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{classStats.strugglingStudents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student List */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Progress</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mastery</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.currentModule}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`h-2.5 rounded-full ${
                                student.masteryPercentage >= 90 ? 'bg-blue-600' :
                                student.masteryPercentage >= 70 ? 'bg-green-500' :
                                student.masteryPercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${student.masteryPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{student.masteryPercentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === 'active' ? 'bg-green-100 text-green-800' :
                          student.status === 'struggling' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Struggle Alerts */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Struggle Alerts</h2>

            <div className="space-y-4">
              {alerts.filter(a => !a.resolved).map((alert) => (
                <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-red-800">{alert.studentName}</p>
                      <p className="text-sm text-red-600">{alert.issue}</p>
                      <p className="text-xs text-red-500">{alert.timestamp}</p>
                    </div>
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}

              {alerts.filter(a => !a.resolved).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No active struggle alerts</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Generate Exercise</h3>
              <div className="space-y-3">
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Select student</option>
                  {students.filter(s => s.status === 'struggling').map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                  placeholder="Describe the custom exercise to generate..."
                ></textarea>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  Generate Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}