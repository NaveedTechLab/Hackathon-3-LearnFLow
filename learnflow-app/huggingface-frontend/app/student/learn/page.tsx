'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const editorRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        simulateExecution();
      }
    } catch (error) {
      console.log('Using simulated execution (API not available)');
      simulateExecution();
    }

    setIsLoading(false);
  };

  const simulateExecution = () => {
    const lines = code.split('\n');
    let output = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('print(')) {
        const match = trimmed.match(/print\((.*)\)/);
        if (match) {
          let content = match[1];
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
\`\`\`

**Key points:**
- \`range(n)\` generates numbers 0 to n-1
- Use \`break\` to exit early
- Use \`continue\` to skip to next iteration`;
    }

    if (lowerQuestion.includes('function') || lowerQuestion.includes('def')) {
      return `**Functions in Python**

Functions are reusable blocks of code:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# Calling functions
message = greet("Alice")
print(message)  # Hello, Alice!
\`\`\`

Try writing a function in the code editor!`;
    }

    if (lowerQuestion.includes('list')) {
      return `**Lists in Python**

Lists are ordered, mutable collections:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
print(numbers)  # [1, 2, 3, 4, 5, 6]
\`\`\`

Try creating a list in the code editor!`;
    }

    if (lowerQuestion.includes('if') || lowerQuestion.includes('condition')) {
      return `**If Statements in Python**

\`\`\`python
age = 18

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")
\`\`\`

Try writing an if statement!`;
    }

    return `Great question about "${question}"!

I'm your Python AI tutor. I can help you with:
- **Python syntax** - variables, operators, data types
- **Control flow** - if/else, loops, functions
- **Data structures** - lists, dictionaries, tuples

Try asking about a specific topic!`;
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
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: generateLocalResponse(currentInput)
        }]);
      }
    } catch (error) {
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
      {/* Animated background - hidden on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative">
        {/* Responsive Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center min-w-0">
                <Link href="/student/dashboard" className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-lg">PY</span>
                  </div>
                  <div className="ml-2 sm:ml-3 hidden xs:block">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                      Python Studio
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">AI-powered tutoring</p>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg px-3 py-1.5">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Module: Basics</span>
                </div>
                <Link href="/student/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm">
                  Dashboard
                </Link>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">A</span>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Link href="/student/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link href="/resources" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100">
                    Resources
                  </Link>
                  <div className="px-3 py-2 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-700">Module: Python Basics</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden sticky top-[57px] sm:top-[65px] z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-3 py-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                AI Tutor
              </span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'code'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code Editor
              </span>
            </button>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
          {/* Main Content Grid - Side by side on desktop, tabs on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">

            {/* Chat Interface */}
            <div className={`${activeTab === 'chat' ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 overflow-hidden h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)] lg:h-auto flex flex-col">
                {/* Chat Header */}
                <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      AI Tutor Chat
                    </h2>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-b from-gray-50 to-gray-100 lg:h-80">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl max-w-[90%] sm:max-w-[85%] ${
                        msg.role === 'user'
                          ? 'ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'mr-auto bg-white text-gray-800 shadow-md border border-gray-100'
                      }`}
                    >
                      <div className="flex items-start">
                        {msg.role === 'assistant' && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                        )}
                        <div className={`text-sm sm:text-base whitespace-pre-wrap ${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-3 sm:p-4 border-t border-gray-100 bg-white flex-shrink-0">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask a Python question..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isSending || !inputMessage.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm sm:text-base flex items-center"
                    >
                      {isSending ? (
                        <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                      <span className="ml-1.5 hidden sm:inline">{isSending ? 'Sending...' : 'Send'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className={`${activeTab === 'code' ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 overflow-hidden h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)] lg:h-auto flex flex-col">
                {/* Editor Header */}
                <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Python Editor
                    </h2>
                    <button
                      onClick={handleRunCode}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl disabled:opacity-50 transition-all font-medium text-sm sm:text-base flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Running...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Run Code
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Editor */}
                <div className="flex-1 min-h-[200px] sm:min-h-[250px] lg:h-72">
                  <MonacoEditor
                    height="100%"
                    language="python"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      fontFamily: 'Consolas, "Courier New", monospace',
                      padding: { top: 10, bottom: 10 },
                      lineNumbers: 'on',
                      wordWrap: 'on',
                    }}
                  />
                </div>

                {/* Output */}
                <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Output
                  </h3>
                  <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm h-20 sm:h-24 lg:h-28 overflow-auto">
                    {output || 'Click "Run Code" to execute your Python code...'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Resources - Responsive Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learning Resources
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: 'Python Basics', desc: 'Variables, data types, operators', color: 'blue', icon: '🐍' },
                { title: 'Control Flow', desc: 'If statements, loops, functions', color: 'purple', icon: '🔄' },
                { title: 'Practice', desc: 'Coding challenges and projects', color: 'green', icon: '💪' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-xl p-4 sm:p-6 border border-white/50 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]`}
                >
                  <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 sm:mb-4">{item.desc}</p>
                  <button className={`w-full sm:w-auto bg-${item.color}-500 hover:bg-${item.color}-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        /* Custom scrollbar for chat */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
