'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your Python AI tutor. I'm here to help you learn Python programming. You can ask me about:\n\n- Python syntax and concepts\n- Code explanations\n- Debugging help\n- Best practices\n- Exercise guidance\n\nWhat would you like to learn today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How do I create a for loop?",
    "Explain list comprehensions",
    "What are Python functions?",
    "How do I handle errors?",
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('for loop') || lowerQuestion.includes('loop')) {
      return `Great question! A for loop in Python is used to iterate over sequences like lists, strings, or ranges.

Here's the basic syntax:

\`\`\`python
# Iterating over a list
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)

# Using range
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Using range with start, stop, step
for i in range(0, 10, 2):
    print(i)  # Prints 0, 2, 4, 6, 8
\`\`\`

Key points:
- No need for index counters like in other languages
- The indented block is the loop body
- Use \`break\` to exit early, \`continue\` to skip iterations

Would you like me to explain more or show different examples?`;
    }

    if (lowerQuestion.includes('list comprehension')) {
      return `List comprehensions are a concise way to create lists in Python!

Basic syntax: \`[expression for item in iterable]\`

Examples:

\`\`\`python
# Create a list of squares
squares = [x**2 for x in range(10)]
# Result: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition (filtering)
evens = [x for x in range(20) if x % 2 == 0]
# Result: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# String manipulation
words = ['hello', 'world']
upper_words = [word.upper() for word in words]
# Result: ['HELLO', 'WORLD']
\`\`\`

Benefits:
- More readable than traditional loops
- Usually faster
- Can include conditions for filtering

Would you like to practice with some exercises?`;
    }

    if (lowerQuestion.includes('function')) {
      return `Functions in Python are reusable blocks of code that perform specific tasks.

Basic syntax:

\`\`\`python
# Simple function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameter
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

# Function with multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

# Using the functions
print(greet("Alice"))  # Hello, Alice!
print(greet_with_title("Smith"))  # Hello, Mr. Smith!
minimum, maximum, average = get_stats([1, 2, 3, 4, 5])
\`\`\`

Key concepts:
- \`def\` keyword defines a function
- Parameters go in parentheses
- \`return\` sends values back
- Functions can have default parameters
- *args and **kwargs for flexible arguments

Want me to explain any of these in more detail?`;
    }

    if (lowerQuestion.includes('error') || lowerQuestion.includes('exception') || lowerQuestion.includes('debug')) {
      return `Error handling in Python uses try/except blocks to gracefully handle exceptions.

\`\`\`python
# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Multiple exceptions
try:
    value = int("not a number")
except ValueError:
    print("Invalid number format")
except TypeError:
    print("Type error occurred")

# Using else and finally
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found!")
else:
    print("File read successfully")
finally:
    file.close()  # Always executes

# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age
\`\`\`

Common exceptions:
- \`ValueError\` - Wrong value type
- \`TypeError\` - Wrong data type
- \`KeyError\` - Missing dictionary key
- \`IndexError\` - Index out of range
- \`FileNotFoundError\` - File doesn't exist

Need help debugging a specific error?`;
    }

    // Default response
    return `That's a great question about "${question}"!

As your AI Python tutor, I can help you understand this concept better. Here are some suggestions:

1. **Try it yourself**: Open the Learn page and experiment with code
2. **Take a quiz**: Test your knowledge on this topic
3. **Ask follow-up questions**: I'm here to help clarify anything

Would you like me to:
- Provide a code example?
- Explain the underlying concept?
- Give you a practice exercise?

Feel free to ask more specific questions!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsSending(true);

    let responseText = '';

    // Try to call the real API
    try {
      const token = localStorage.getItem('learnflow_token');
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          user_id: user?.id || 'anonymous',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        responseText = data.response;
      } else {
        // Fallback to simulated response
        responseText = generateResponse(userMessage.content);
      }
    } catch (error) {
      // API not available, use simulated response
      console.log('Using simulated response (API not available)');
      responseText = generateResponse(userMessage.content);
    }

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsSending(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/student/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LF</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">AI Python Tutor</span>
                <div className="flex items-center text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Online
                </div>
              </div>
            </Link>
            <Link
              href="/student/dashboard"
              className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col">
        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white shadow-lg text-gray-800'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">AI Tutor</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div className="bg-white shadow-lg p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about Python..."
              disabled={isSending}
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isSending}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
