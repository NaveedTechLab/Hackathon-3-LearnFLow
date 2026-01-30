'use client';

import Link from 'next/link';
import { useState } from 'react';

type Guide = {
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  readTime: string;
  content: string;
};

type Cheatsheet = {
  title: string;
  icon: string;
  downloads: string;
  content: string;
};

type Video = {
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  youtubeId: string;
  channel: string;
};

type Tool = {
  name: string;
  description: string;
  url: string;
  icon: string;
};

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('guides');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const guides: Guide[] = [
    {
      title: 'Python Installation Guide',
      description: 'Step-by-step guide to install Python on Windows, Mac, and Linux.',
      icon: '📥',
      difficulty: 'Beginner',
      readTime: '5 min',
      content: `# Python Installation Guide

## Windows Installation

1. **Download Python**: Visit [python.org](https://python.org) and download the latest version
2. **Run Installer**: Double-click the downloaded file
3. **Important**: Check "Add Python to PATH" before clicking Install
4. **Verify**: Open Command Prompt and type \`python --version\`

## Mac Installation

1. **Using Homebrew** (Recommended):
   \`\`\`bash
   brew install python
   \`\`\`

2. **Or download from python.org**

3. **Verify**: Open Terminal and type \`python3 --version\`

## Linux Installation

Most Linux distributions come with Python pre-installed.

\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip

# Verify installation
python3 --version
\`\`\`

## Next Steps

After installation, you can:
- Run Python scripts: \`python script.py\`
- Use the interactive shell: \`python\`
- Install packages: \`pip install package_name\``,
    },
    {
      title: 'Setting Up VS Code for Python',
      description: 'Configure VS Code with the best extensions for Python development.',
      icon: '💻',
      difficulty: 'Beginner',
      readTime: '10 min',
      content: `# Setting Up VS Code for Python

## Step 1: Install VS Code

Download from [code.visualstudio.com](https://code.visualstudio.com)

## Step 2: Essential Extensions

### Must-Have Extensions:

1. **Python** (Microsoft)
   - IntelliSense, linting, debugging
   - Search "Python" in Extensions

2. **Pylance**
   - Fast, feature-rich language support
   - Type checking and auto-imports

3. **Python Indent**
   - Correct indentation on Enter

### Recommended Extensions:

4. **autoDocstring**
   - Generate docstrings automatically

5. **Python Test Explorer**
   - Run and debug tests easily

## Step 3: Configure Settings

Open Settings (Ctrl+,) and configure:

\`\`\`json
{
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true
}
\`\`\`

## Step 4: Select Python Interpreter

1. Press Ctrl+Shift+P
2. Type "Python: Select Interpreter"
3. Choose your Python installation

## Pro Tips

- Use \`Ctrl+Shift+P\` for command palette
- \`F5\` to run/debug
- \`Ctrl+\`\` to open terminal`,
    },
    {
      title: 'Virtual Environments Explained',
      description: 'Learn why and how to use virtual environments in Python projects.',
      icon: '📦',
      difficulty: 'Intermediate',
      readTime: '8 min',
      content: `# Virtual Environments Explained

## Why Use Virtual Environments?

- **Isolation**: Each project has its own dependencies
- **Version Control**: Different projects can use different package versions
- **Clean System**: Don't pollute global Python installation
- **Reproducibility**: Share exact dependencies with others

## Creating Virtual Environments

### Using venv (Built-in)

\`\`\`bash
# Create virtual environment
python -m venv myenv

# Activate (Windows)
myenv\\Scripts\\activate

# Activate (Mac/Linux)
source myenv/bin/activate

# Deactivate
deactivate
\`\`\`

### Using conda

\`\`\`bash
# Create environment
conda create --name myenv python=3.11

# Activate
conda activate myenv

# Deactivate
conda deactivate
\`\`\`

## Managing Dependencies

\`\`\`bash
# Install packages
pip install requests pandas

# Save dependencies
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt
\`\`\`

## Best Practices

1. Always use virtual environments for projects
2. Keep requirements.txt updated
3. Don't commit venv folder to git
4. Add venv to .gitignore`,
    },
    {
      title: 'Git for Python Developers',
      description: 'Version control basics every Python developer should know.',
      icon: '🔀',
      difficulty: 'Intermediate',
      readTime: '15 min',
      content: `# Git for Python Developers

## Getting Started

\`\`\`bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Initialize repository
git init

# Clone existing repo
git clone https://github.com/user/repo.git
\`\`\`

## Essential Commands

\`\`\`bash
# Check status
git status

# Stage changes
git add filename.py
git add .  # All files

# Commit changes
git commit -m "Add feature X"

# View history
git log --oneline
\`\`\`

## Branching

\`\`\`bash
# Create branch
git branch feature-name

# Switch branch
git checkout feature-name

# Create and switch
git checkout -b feature-name

# Merge branch
git merge feature-name
\`\`\`

## Python .gitignore

\`\`\`
# Virtual environments
venv/
env/
.env

# Python cache
__pycache__/
*.pyc
*.pyo

# IDE
.vscode/
.idea/

# Distribution
dist/
build/
*.egg-info/
\`\`\`

## Remote Repositories

\`\`\`bash
# Add remote
git remote add origin URL

# Push changes
git push -u origin main

# Pull changes
git pull origin main
\`\`\``,
    },
    {
      title: 'Debugging Techniques',
      description: 'Master the art of finding and fixing bugs in your Python code.',
      icon: '🐛',
      difficulty: 'Intermediate',
      readTime: '12 min',
      content: `# Python Debugging Techniques

## 1. Print Debugging

\`\`\`python
def calculate(x, y):
    print(f"DEBUG: x={x}, y={y}")  # Add debug prints
    result = x * y
    print(f"DEBUG: result={result}")
    return result
\`\`\`

## 2. Using the Debugger (pdb)

\`\`\`python
import pdb

def buggy_function():
    x = 10
    pdb.set_trace()  # Breakpoint
    y = x / 0  # Bug here
    return y
\`\`\`

### pdb Commands:
- \`n\` - Next line
- \`s\` - Step into function
- \`c\` - Continue
- \`p variable\` - Print variable
- \`q\` - Quit

## 3. VS Code Debugging

1. Set breakpoints (click left of line number)
2. Press F5 to start debugging
3. Use debug controls (step over, step into, continue)
4. Watch variables in the sidebar

## 4. Logging

\`\`\`python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def process_data(data):
    logger.debug(f"Processing: {data}")
    logger.info("Process started")
    logger.warning("Something might be wrong")
    logger.error("An error occurred")
\`\`\`

## 5. Common Bug Patterns

### Off-by-one errors
\`\`\`python
# Wrong
for i in range(len(items) + 1):  # IndexError

# Correct
for i in range(len(items)):
\`\`\`

### Mutable default arguments
\`\`\`python
# Wrong
def add_item(item, items=[]):
    items.append(item)
    return items

# Correct
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
\`\`\``,
    },
    {
      title: 'Python Best Practices',
      description: 'Write clean, maintainable, and Pythonic code.',
      icon: '✨',
      difficulty: 'Advanced',
      readTime: '20 min',
      content: `# Python Best Practices

## 1. Follow PEP 8 Style Guide

\`\`\`python
# Good
def calculate_total(items):
    total = sum(item.price for item in items)
    return total

# Bad
def CalculateTotal(Items):
    Total=sum(Item.price for Item in Items)
    return Total
\`\`\`

## 2. Use Type Hints

\`\`\`python
from typing import List, Optional

def greet(name: str) -> str:
    return f"Hello, {name}!"

def find_user(user_id: int) -> Optional[dict]:
    # Returns user dict or None
    pass
\`\`\`

## 3. Write Docstrings

\`\`\`python
def calculate_average(numbers: List[float]) -> float:
    """Calculate the average of a list of numbers.

    Args:
        numbers: A list of numbers to average.

    Returns:
        The arithmetic mean of the numbers.

    Raises:
        ValueError: If the list is empty.
    """
    if not numbers:
        raise ValueError("Cannot average empty list")
    return sum(numbers) / len(numbers)
\`\`\`

## 4. Use Context Managers

\`\`\`python
# Good
with open('file.txt', 'r') as f:
    content = f.read()

# Bad
f = open('file.txt', 'r')
content = f.read()
f.close()
\`\`\`

## 5. List Comprehensions

\`\`\`python
# Pythonic
squares = [x**2 for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]

# Less Pythonic
squares = []
for x in range(10):
    squares.append(x**2)
\`\`\`

## 6. Use f-strings

\`\`\`python
name = "Alice"
age = 30

# Good
message = f"{name} is {age} years old"

# Avoid
message = name + " is " + str(age) + " years old"
\`\`\`

## 7. Handle Exceptions Properly

\`\`\`python
try:
    result = risky_operation()
except SpecificError as e:
    logger.error(f"Operation failed: {e}")
    raise
except Exception as e:
    logger.exception("Unexpected error")
    raise
\`\`\``,
    },
  ];

  const cheatsheets: Cheatsheet[] = [
    {
      title: 'Python Syntax Cheatsheet',
      icon: '📝',
      downloads: '12.5k',
      content: `PYTHON SYNTAX CHEATSHEET
========================

VARIABLES & DATA TYPES
----------------------
x = 10          # Integer
y = 3.14        # Float
name = "Python" # String
is_true = True  # Boolean
items = [1,2,3] # List
data = {"a": 1} # Dictionary

OPERATORS
---------
+  Addition       -  Subtraction
*  Multiplication /  Division
// Floor Division %  Modulus
** Exponentiation

COMPARISON
----------
==  Equal         !=  Not Equal
>   Greater       <   Less
>=  Greater/Equal <=  Less/Equal

CONTROL FLOW
------------
if condition:
    # code
elif other:
    # code
else:
    # code

LOOPS
-----
for item in items:
    print(item)

while condition:
    # code

FUNCTIONS
---------
def greet(name):
    return f"Hello, {name}"

CLASSES
-------
class Person:
    def __init__(self, name):
        self.name = name`,
    },
    {
      title: 'String Methods Reference',
      icon: '🔤',
      downloads: '8.2k',
      content: `STRING METHODS REFERENCE
========================

CASE METHODS
------------
s.upper()      → "HELLO"
s.lower()      → "hello"
s.capitalize() → "Hello"
s.title()      → "Hello World"
s.swapcase()   → "hELLO"

SEARCH METHODS
--------------
s.find("x")       → index or -1
s.index("x")      → index or error
s.count("x")      → occurrences
s.startswith("x") → True/False
s.endswith("x")   → True/False

MODIFICATION
------------
s.strip()      → remove whitespace
s.lstrip()     → remove left whitespace
s.rstrip()     → remove right whitespace
s.replace("a","b") → replace all

SPLIT & JOIN
------------
s.split(",")   → ["a","b","c"]
",".join(list) → "a,b,c"
s.splitlines() → split by newline

VALIDATION
----------
s.isalpha()  → only letters?
s.isdigit()  → only digits?
s.isalnum()  → letters/digits?
s.isspace()  → only whitespace?
s.isupper()  → all uppercase?
s.islower()  → all lowercase?

FORMATTING
----------
f"{name}"        → f-string
"{} {}".format() → format method
s.center(20)     → center in width
s.ljust(20)      → left justify
s.rjust(20)      → right justify
s.zfill(5)       → pad with zeros`,
    },
    {
      title: 'List Comprehensions',
      icon: '📋',
      downloads: '9.1k',
      content: `LIST COMPREHENSIONS CHEATSHEET
==============================

BASIC SYNTAX
------------
[expression for item in iterable]

EXAMPLES
--------
# Squares
[x**2 for x in range(10)]
→ [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition (filter)
[x for x in range(10) if x % 2 == 0]
→ [0, 2, 4, 6, 8]

# Transform strings
[s.upper() for s in ["hello", "world"]]
→ ["HELLO", "WORLD"]

# Conditional expression
["even" if x%2==0 else "odd" for x in range(5)]
→ ["even", "odd", "even", "odd", "even"]

NESTED LOOPS
------------
[(x,y) for x in [1,2] for y in [3,4]]
→ [(1,3), (1,4), (2,3), (2,4)]

# Flatten nested list
[[1,2], [3,4]] → [1, 2, 3, 4]
[x for sublist in nested for x in sublist]

DICT COMPREHENSION
------------------
{k: v for k, v in items}
{x: x**2 for x in range(5)}
→ {0:0, 1:1, 2:4, 3:9, 4:16}

SET COMPREHENSION
-----------------
{x**2 for x in range(5)}
→ {0, 1, 4, 9, 16}

GENERATOR EXPRESSION
--------------------
(x**2 for x in range(10))
# Memory efficient, lazy evaluation`,
    },
    {
      title: 'Dictionary Operations',
      icon: '📖',
      downloads: '7.8k',
      content: `DICTIONARY OPERATIONS
=====================

CREATING DICTIONARIES
---------------------
d = {}
d = dict()
d = {"name": "Alice", "age": 30}
d = dict(name="Alice", age=30)

ACCESSING VALUES
----------------
d["key"]       # KeyError if missing
d.get("key")   # None if missing
d.get("key", default)  # default if missing

ADDING/UPDATING
---------------
d["key"] = value
d.update({"a": 1, "b": 2})
d |= {"new": "data"}  # Python 3.9+

REMOVING
--------
del d["key"]
d.pop("key")         # returns value
d.pop("key", None)   # no error if missing
d.popitem()          # remove last item
d.clear()            # remove all

ITERATION
---------
for key in d:
for key in d.keys():
for value in d.values():
for key, value in d.items():

USEFUL METHODS
--------------
d.keys()     # all keys
d.values()   # all values
d.items()    # key-value pairs
len(d)       # number of items
"key" in d   # check existence
d.copy()     # shallow copy

MERGING (Python 3.9+)
---------------------
merged = d1 | d2
d1 |= d2  # in-place

DEFAULT VALUES
--------------
from collections import defaultdict
d = defaultdict(list)
d["key"].append(value)`,
    },
    {
      title: 'File I/O Quick Reference',
      icon: '📁',
      downloads: '6.3k',
      content: `FILE I/O QUICK REFERENCE
========================

OPENING FILES
-------------
f = open("file.txt", mode)

MODES
-----
"r"  - Read (default)
"w"  - Write (overwrites)
"a"  - Append
"x"  - Create (error if exists)
"b"  - Binary mode
"t"  - Text mode (default)
"+"  - Read and write

CONTEXT MANAGER (Recommended)
-----------------------------
with open("file.txt", "r") as f:
    content = f.read()
# File automatically closed

READING
-------
f.read()        # entire file
f.read(n)       # n characters
f.readline()    # one line
f.readlines()   # list of lines

# Iterate lines
for line in f:
    print(line)

WRITING
-------
f.write("text")
f.writelines(list_of_strings)

PRACTICAL EXAMPLES
------------------
# Read entire file
with open("data.txt") as f:
    content = f.read()

# Read lines
with open("data.txt") as f:
    lines = f.readlines()

# Write to file
with open("output.txt", "w") as f:
    f.write("Hello World")

# Append to file
with open("log.txt", "a") as f:
    f.write("New log entry\\n")

JSON FILES
----------
import json

# Read JSON
with open("data.json") as f:
    data = json.load(f)

# Write JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)`,
    },
    {
      title: 'Exception Handling Guide',
      icon: '⚠️',
      downloads: '5.9k',
      content: `EXCEPTION HANDLING GUIDE
========================

BASIC SYNTAX
------------
try:
    # risky code
except ExceptionType:
    # handle error
else:
    # runs if no exception
finally:
    # always runs

COMMON EXCEPTIONS
-----------------
ValueError      - Wrong value type
TypeError       - Wrong data type
KeyError        - Dict key not found
IndexError      - Index out of range
FileNotFoundError - File doesn't exist
ZeroDivisionError - Division by zero
AttributeError  - Attribute not found
ImportError     - Import failed

CATCHING EXCEPTIONS
-------------------
# Catch specific
try:
    x = int("abc")
except ValueError:
    print("Invalid number")

# Catch multiple
except (ValueError, TypeError):
    print("Error occurred")

# Get exception info
except ValueError as e:
    print(f"Error: {e}")

# Catch all (avoid when possible)
except Exception as e:
    print(f"Unexpected: {e}")

RAISING EXCEPTIONS
------------------
raise ValueError("Invalid input")
raise TypeError("Expected string")

# Re-raise
except SomeError:
    logger.error("Failed")
    raise

CUSTOM EXCEPTIONS
-----------------
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(message)

raise CustomError("Something wrong")

BEST PRACTICES
--------------
1. Catch specific exceptions
2. Don't use bare except:
3. Log exceptions properly
4. Clean up in finally
5. Fail fast, fail loud`,
    },
  ];

  const videos: Video[] = [
    {
      title: 'Python in 100 Seconds',
      duration: '2:18',
      views: '3.8M',
      thumbnail: '🎬',
      youtubeId: 'x7X9w_GIm1s',
      channel: 'Fireship',
    },
    {
      title: 'Python Tutorial for Beginners',
      duration: '6:14:07',
      views: '41M',
      thumbnail: '🔄',
      youtubeId: '_uQrJ0TkZlc',
      channel: 'Programming with Mosh',
    },
    {
      title: 'Python OOP Tutorial',
      duration: '1:20:49',
      views: '2.8M',
      thumbnail: '🏗️',
      youtubeId: 'ZDa-Z5JzLYM',
      channel: 'Corey Schafer',
    },
    {
      title: 'Python API Development',
      duration: '19:03:32',
      views: '1.2M',
      thumbnail: '🌐',
      youtubeId: '0sOvCWFmrtA',
      channel: 'freeCodeCamp',
    },
  ];

  const tools: Tool[] = [
    {
      name: 'Python Official Docs',
      description: 'The official Python documentation',
      url: 'https://docs.python.org/3/',
      icon: '📚',
    },
    {
      name: 'PyPI',
      description: 'Python Package Index - find libraries',
      url: 'https://pypi.org/',
      icon: '📦',
    },
    {
      name: 'Replit',
      description: 'Online Python IDE',
      url: 'https://replit.com/languages/python3',
      icon: '💻',
    },
    {
      name: 'Stack Overflow',
      description: 'Q&A for programmers',
      url: 'https://stackoverflow.com/questions/tagged/python',
      icon: '❓',
    },
    {
      name: 'Real Python',
      description: 'Python tutorials and articles',
      url: 'https://realpython.com/',
      icon: '🐍',
    },
    {
      name: 'Python Tutor',
      description: 'Visualize code execution',
      url: 'https://pythontutor.com/',
      icon: '👁️',
    },
  ];

  const downloadCheatsheet = (sheet: Cheatsheet) => {
    const blob = new Blob([sheet.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sheet.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-warmgray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-sm sm:text-lg">LF</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-warmgray-900">LearnFlow</span>
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
                    item.name === 'Resources'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-warmgray-600 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              <Link href="/register" className="text-warmgray-700 hover:text-teal-700 font-medium text-sm">
                Sign Up
              </Link>
              <Link href="/" className="bg-teal-600 text-white px-5 py-2.5 rounded-full hover:bg-teal-700 transition-all font-medium text-sm">
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-warmgray-600 hover:bg-teal-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-warmgray-100">
              <div className="flex flex-col space-y-1">
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
                    className={`px-4 py-3 rounded-xl font-medium ${
                      item.name === 'Resources' ? 'bg-teal-50 text-teal-700' : 'text-warmgray-700 hover:bg-teal-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-warmgray-100 flex flex-col space-y-2">
                  <Link href="/register" className="text-teal-600 font-medium px-4 py-2">Sign Up</Link>
                  <Link href="/" className="bg-teal-600 text-white px-4 py-3 rounded-xl text-center font-medium">Login</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-warmgray-900 mb-2 sm:mb-4">
            Learning <span className="text-teal-600">Resources</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-warmgray-600 px-2">
            Free guides, cheatsheets, videos, and tools to accelerate your Python learning journey.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-3 sm:px-4 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-1 sm:gap-2 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-soft overflow-x-auto">
            {[
              { id: 'guides', label: 'Guides', icon: '📖' },
              { id: 'cheatsheets', label: 'Sheets', icon: '📝' },
              { id: 'videos', label: 'Videos', icon: '🎥' },
              { id: 'tools', label: 'Tools', icon: '🛠️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-soft'
                    : 'text-warmgray-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span>
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-3 sm:px-4 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'guides' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {guides.map((guide, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedGuide(guide)}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-soft-lg transition-all group cursor-pointer"
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{guide.icon}</div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                        guide.difficulty === 'Beginner'
                          ? 'bg-green-100 text-green-700'
                          : guide.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {guide.difficulty}
                    </span>
                    <span className="text-warmgray-400 text-xs">{guide.readTime} read</span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-warmgray-900 mb-1 sm:mb-2 group-hover:text-teal-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-warmgray-600 line-clamp-2">{guide.description}</p>
                  <div className="mt-3 sm:mt-4 text-teal-600 text-xs sm:text-sm font-medium flex items-center gap-1">
                    Read Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cheatsheets' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cheatsheets.map((sheet, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-soft-lg transition-all group">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl">{sheet.icon}</span>
                    <span className="text-xs sm:text-sm text-warmgray-400">{sheet.downloads} downloads</span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-warmgray-900 mb-3 sm:mb-4 group-hover:text-teal-600 transition-colors">
                    {sheet.title}
                  </h3>
                  <button
                    onClick={() => downloadCheatsheet(sheet)}
                    className="w-full bg-teal-50 text-teal-700 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm font-medium hover:bg-teal-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="hidden xs:inline">Download </span>Cheatsheet
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-teal-500 to-sage-500 h-36 sm:h-48 flex items-center justify-center relative">
                    <span className="text-4xl sm:text-6xl">{video.thumbnail}</span>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="font-semibold text-sm sm:text-base text-warmgray-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-warmgray-500">
                      {video.channel} • {video.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-soft-lg transition-all group flex items-center gap-3 sm:gap-4"
                >
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{tool.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-warmgray-900 group-hover:text-teal-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-warmgray-600 line-clamp-1">{tool.description}</p>
                  </div>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-warmgray-400 group-hover:text-teal-600 transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4" onClick={() => setSelectedGuide(null)}>
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-warmgray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span className="text-2xl sm:text-3xl flex-shrink-0">{selectedGuide.icon}</span>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-bold text-warmgray-900 truncate">{selectedGuide.title}</h2>
                  <p className="text-xs sm:text-sm text-warmgray-500">{selectedGuide.readTime} read</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="text-warmgray-400 hover:text-warmgray-600 p-2 flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-100px)]">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-warmgray-700 leading-relaxed">
                {selectedGuide.content}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4" onClick={() => setSelectedVideo(null)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1 flex-1 mr-2">{selectedVideo.title}</h3>
              <button onClick={() => setSelectedVideo(null)} className="text-white hover:text-warmgray-300 p-2 flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg sm:rounded-xl"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-warmgray-400 mt-2 sm:mt-3 text-xs sm:text-sm">
              {selectedVideo.channel} • {selectedVideo.views} views
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-10 sm:py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Want More Resources?</h2>
          <p className="text-sm sm:text-base text-teal-100 mb-6 sm:mb-8">Sign up for free and get access to exclusive learning materials.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-teal-700 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-cream-50 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
