'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Dynamically import Monaco Editor with error handling to avoid SSR issues
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-900">
        <div className="text-green-400 font-mono text-sm">Loading code editor...</div>
      </div>
    )
  }
);

export default function LearnPage() {
  const [code, setCode] = useState<string>('print("Hello, Python learner!")\n# Write your code here');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([
    { role: 'assistant', content: 'Hello! I\'m your Python tutor. What would you like to learn today?' }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const editorRef = useRef<any>(null);

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('Running code...');

    try {
      const token = localStorage.getItem('learnflow_token');
      const response = await fetch(`${API_URL}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          setOutput(`Error:\n${data.error}\n\nOutput:\n${data.output || '(none)'}`);
        } else {
          setOutput(data.output || 'Code executed successfully (no output)');
        }
      } else {
        // Fallback: simulate execution for demo
        simulateExecution();
      }
    } catch (error) {
      // API not available, simulate execution
      console.log('Using simulated execution (API not available)');
      simulateExecution();
    }

    setIsLoading(false);
  };

  const simulateExecution = () => {
    // Simple Python simulation for common operations
    const lines = code.split('\n');
    let output = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('print(')) {
        const match = trimmed.match(/print\((.*)\)/);
        if (match) {
          let content = match[1];
          // Handle string literals
          if ((content.startsWith('"') && content.endsWith('"')) ||
              (content.startsWith("'") && content.endsWith("'"))) {
            output += content.slice(1, -1) + '\n';
          } else if (content.startsWith('f"') || content.startsWith("f'")) {
            output += content.slice(2, -1) + '\n';
          } else {
            output += content + '\n';
          }
        }
      }
    }

    setOutput(output || 'Code executed successfully!\n(Simulated - connect API Gateway for real execution)');
  };

  const [isSending, setIsSending] = useState<boolean>(false);

  const generateLocalResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('loop') || lowerQuestion.includes('for')) {
      return `**For Loops in Python**

A for loop iterates over a sequence (list, string, range, etc.):

\`\`\`python
# Basic for loop
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Loop through a list
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)

# Loop with enumerate (get index too)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

**Key points:**
- \`range(n)\` generates numbers 0 to n-1
- Use \`break\` to exit early
- Use \`continue\` to skip to next iteration

Would you like me to explain more or try it in the code editor?`;
    }

    if (lowerQuestion.includes('function') || lowerQuestion.includes('def')) {
      return `**Functions in Python**

Functions are reusable blocks of code:

\`\`\`python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# With default parameter
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers)

# Calling functions
message = greet("Alice")
minimum, maximum = get_stats([1, 2, 3, 4, 5])
\`\`\`

Try writing a function in the code editor!`;
    }

    if (lowerQuestion.includes('list')) {
      return `**Lists in Python**

Lists are ordered, mutable collections:

\`\`\`python
# Create a list
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Access elements
first = numbers[0]      # 1
last = numbers[-1]      # 5

# Modify lists
numbers.append(6)       # Add to end
numbers.insert(0, 0)    # Insert at index
numbers.remove(3)       # Remove value

# List comprehension
squares = [x**2 for x in range(5)]
# Result: [0, 1, 4, 9, 16]
\`\`\`

Try creating a list in the code editor!`;
    }

    if (lowerQuestion.includes('if') || lowerQuestion.includes('condition')) {
      return `**If Statements in Python**

Control flow with conditions:

\`\`\`python
age = 18

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")

# One-line conditional
status = "Adult" if age >= 18 else "Minor"

# Multiple conditions
if age >= 18 and has_license:
    print("Can drive")
\`\`\`

Try writing an if statement in the code editor!`;
    }

    return `Great question about "${question}"!

I'm your Python AI tutor. I can help you with:
- **Python syntax** - variables, operators, data types
- **Control flow** - if/else, loops, functions
- **Data structures** - lists, dictionaries, tuples
- **Code debugging** - finding and fixing errors

Try asking about a specific topic, or write some code in the editor and I'll help you understand it!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const userMessage = { role: 'user', content: inputMessage };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsSending(true);

    try {
      const token = localStorage.getItem('learnflow_token');
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
          user_id: 'learn-page-user',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response
        }]);
      } else {
        // Fallback to local response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: generateLocalResponse(currentInput)
        }]);
      }
    } catch (error) {
      // API not available, use local response
      console.log('Using local response (API not available)');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: generateLocalResponse(currentInput)
      }]);
    }

    setIsSending(false);
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative">
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Python Learning Studio
                </h1>
                <p className="text-gray-600 mt-1">Interactive coding with AI-powered tutoring</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-gray-700">Module: Control Flow</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Chat Interface */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    AI Tutor Chat
                  </h2>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded-2xl max-w-[85%] ${
                      msg.role === 'user'
                        ? 'ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'mr-auto bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 shadow-md'
                    }`}
                  >
                    <div className="flex items-start">
                      {msg.role === 'assistant' && (
                        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      )}
                      <div className={`${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/20 bg-white/50">
                <div className="flex">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a Python question..."
                    className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending || !inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-r-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    <div className="flex items-center">
                      {isSending ? (
                        <>
                          <svg className="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Thinking...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-5 border-b border-white/20 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Python Code Editor
                  </h2>
                  <button
                    onClick={handleRunCode}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-all duration-300 transform hover:scale-105 font-medium flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Running...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Run Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="h-80">
                <MonacoEditor
                  height="100%"
                  language="python"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  onMount={handleEditorDidMount}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    fontFamily: 'Consolas, "Courier New", monospace',
                  }}
                />
              </div>

              <div className="p-4 border-t border-white/20 bg-gray-50/50">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Output
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-32 overflow-auto border border-gray-700">
                  {output || 'Click "Run Code" to execute your Python code...'}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Resources */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learning Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Python Basics</h3>
                <p className="text-gray-600 mb-4">Variables, data types, operators, and basic syntax</p>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Start Module
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Control Flow</h3>
                <p className="text-gray-600 mb-4">If statements, loops, functions, and control structures</p>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Start Module
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Practice Exercises</h3>
                <p className="text-gray-600 mb-4">Hands-on coding challenges and projects</p>
                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Start Practice
                </button>
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
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}