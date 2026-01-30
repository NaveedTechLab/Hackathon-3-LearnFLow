'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function QuizPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the correct way to create a variable in Python?",
      options: ["var x = 5", "x = 5", "int x = 5", "let x = 5"],
      correctAnswer: 1,
      explanation: "In Python, you create variables by simply assigning a value. No keyword like 'var', 'let', or type declaration is needed."
    },
    {
      id: 2,
      question: "Which of the following is a valid Python list?",
      options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
      correctAnswer: 0,
      explanation: "Lists in Python are created using square brackets []. Curly braces {} create sets or dicts, and parentheses () create tuples."
    },
    {
      id: 3,
      question: "What does the 'len()' function do?",
      options: ["Converts to lowercase", "Returns the length of an object", "Creates a new list", "Removes an item"],
      correctAnswer: 1,
      explanation: "The len() function returns the number of items in an object like a string, list, tuple, etc."
    },
    {
      id: 4,
      question: "How do you start a for loop in Python?",
      options: ["for (i = 0; i < 10; i++)", "for i in range(10):", "foreach i in range(10)", "loop i from 0 to 10"],
      correctAnswer: 1,
      explanation: "Python uses 'for item in iterable:' syntax. The range() function generates a sequence of numbers."
    },
    {
      id: 5,
      question: "What will print(type(5.0)) output?",
      options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'decimal'>"],
      correctAnswer: 1,
      explanation: "5.0 is a floating-point number in Python, so type() returns <class 'float'>."
    }
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

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/student/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LF</span>
                </div>
                <span className="text-xl font-bold text-gray-900">LearnFlow</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-4xl font-bold ${
                percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>{percentage}%</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-gray-600 mb-6">
              You scored {score} out of {questions.length} questions correctly.
            </p>

            <div className={`p-4 rounded-lg mb-8 ${
              percentage >= 80 ? 'bg-green-50 text-green-800' :
              percentage >= 60 ? 'bg-yellow-50 text-yellow-800' :
              'bg-red-50 text-red-800'
            }`}>
              {percentage >= 80 ? "Excellent! You've mastered this topic!" :
               percentage >= 60 ? "Good job! Keep practicing to improve." :
               "Keep learning! Review the material and try again."}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestartQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Retry Quiz
              </button>
              <Link
                href="/student/dashboard"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/student/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">LearnFlow Quiz</span>
            </Link>
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                    : selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                    showResult
                      ? index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      : selectedAnswer === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === question.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium mb-1">
                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect!'}
              </p>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Link
              href="/student/dashboard"
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Exit Quiz
            </Link>

            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
