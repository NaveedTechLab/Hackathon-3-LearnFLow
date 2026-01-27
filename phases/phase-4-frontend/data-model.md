# Data Model: Phase 4 Frontend

## Entities

### Lesson
- **Name**: Educational content unit displayed in the Lesson Viewer
- **Fields**:
  - lessonId: Unique identifier for the lesson
  - title: Title of the lesson
  - content: Main content of the lesson (text, HTML, markdown)
  - courseId: Reference to the course this lesson belongs to
  - createdAt: Timestamp when the lesson was created
  - updatedAt: Timestamp when the lesson was last updated
  - metadata: Additional information (estimated duration, difficulty level, prerequisites)
- **Relationships**: Connected to user progress tracking and code exercises

### CodeExercise
- **Name**: Interactive coding challenge that students can work on
- **Fields**:
  - exerciseId: Unique identifier for the exercise
  - lessonId: Reference to the parent lesson
  - starterCode: Initial code template for the student to modify
  - solutionCode: Reference solution (for validation)
  - instructions: Text instructions for the exercise
  - language: Programming language for syntax highlighting
  - difficultyLevel: Difficulty rating (beginner, intermediate, advanced)
- **Relationships**: Belongs to a Lesson, connected to Student Interaction

### StudentInteraction
- **Name**: User engagement with lesson content, code editor, and AI agent
- **Fields**:
  - interactionId: Unique identifier for the interaction
  - userId: Reference to the student
  - lessonId: Reference to the lesson being interacted with
  - codeSnapshot: Saved state of code in the editor at a specific time
  - timestamp: When the interaction occurred
  - interactionType: Type of interaction (editing, submitting, requesting help)
- **Relationships**: Connected to User, Lesson, and Code Exercise

### AIAgentResponse
- **Name**: AI-generated assistance and feedback provided through the chat interface
- **Fields**:
  - responseId: Unique identifier for the response
  - query: The original question or request from the student
  - response: The AI-generated response
  - timestamp: When the response was generated
  - sourceService: Which backend service provided the response (Course Agent)
  - context: Context information about the lesson or code being discussed
- **Relationships**: Connected to Student Interaction and potentially to Lessons/Code Exercises

## Validation Rules
- Lesson content must be properly formatted for display
- Code exercises must have valid starter code for the specified language
- Student interactions must be associated with valid user and lesson IDs
- AI agent responses must be properly attributed to the correct source service

## State Transitions
- Lesson: Draft → Published → Archived (based on curriculum lifecycle)
- Code Exercise: Created → Active → Completed (student progression)
- Student Interaction: Started → In Progress → Submitted/Completed (session lifecycle)
- AI Agent Response: Requested → Processing → Delivered (response lifecycle)