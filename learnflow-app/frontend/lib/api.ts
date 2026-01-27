// API Service Layer for LearnFlow Frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Service URLs
const SERVICES = {
  triage: process.env.NEXT_PUBLIC_TRIAGE_URL || 'http://localhost:8001',
  concepts: process.env.NEXT_PUBLIC_CONCEPTS_URL || 'http://localhost:8002',
  codeReview: process.env.NEXT_PUBLIC_CODE_REVIEW_URL || 'http://localhost:8003',
  debug: process.env.NEXT_PUBLIC_DEBUG_URL || 'http://localhost:8004',
  exercise: process.env.NEXT_PUBLIC_EXERCISE_URL || 'http://localhost:8005',
  progress: process.env.NEXT_PUBLIC_PROGRESS_URL || 'http://localhost:8006',
};

// Auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  if (typeof window !== 'undefined') {
    localStorage.setItem('learnflow_token', token);
  }
};

export const getAuthToken = (): string | null => {
  if (authToken) return authToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('learnflow_token');
  }
  return null;
};

export const clearAuthToken = () => {
  authToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('learnflow_token');
  }
};

// Generic fetch wrapper
async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ==================== AUTH API ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher';
  };
}

export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  me: async (): Promise<AuthResponse['user']> => {
    return apiFetch<AuthResponse['user']>(`${API_BASE_URL}/auth/me`);
  },
};

// ==================== TRIAGE API ====================

export interface QueryRequest {
  query: string;
  user_id: string;
}

export interface RoutingResponse {
  agent: string;
  message: string;
  params: Record<string, any>;
}

export const triageAPI = {
  routeQuery: async (data: QueryRequest): Promise<RoutingResponse> => {
    return apiFetch<RoutingResponse>(`${SERVICES.triage}/query`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  health: async (): Promise<{ status: string }> => {
    return apiFetch<{ status: string }>(`${SERVICES.triage}/health`);
  },
};

// ==================== CONCEPTS API ====================

export interface ExplainRequest {
  topic: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  user_context?: Record<string, any>;
}

export interface ExplanationResponse {
  topic: string;
  explanation: string;
  examples: string[];
  level: string;
}

export const conceptsAPI = {
  explain: async (data: ExplainRequest): Promise<ExplanationResponse> => {
    return apiFetch<ExplanationResponse>(`${SERVICES.concepts}/explain`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  health: async (): Promise<{ status: string }> => {
    return apiFetch<{ status: string }>(`${SERVICES.concepts}/health`);
  },
};

// ==================== EXERCISE API ====================

export interface ExerciseRequest {
  module: string;
  topic: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  user_id?: string;
}

export interface ExerciseResponse {
  id: string;
  module: string;
  topic: string;
  problem: string;
  starter_code: string;
  test_cases: Array<{ input: string; expected_output: string }>;
  difficulty: string;
}

export interface SubmissionRequest {
  quiz_id: string;
  user_id: string;
  code: string;
}

export interface GradeResponse {
  quiz_id: string;
  user_id: string;
  score: number;
  feedback: string;
  passed_tests: number;
  total_tests: number;
}

export const exerciseAPI = {
  generate: async (data: ExerciseRequest): Promise<ExerciseResponse> => {
    return apiFetch<ExerciseResponse>(`${SERVICES.exercise}/generate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  grade: async (data: SubmissionRequest): Promise<GradeResponse> => {
    return apiFetch<GradeResponse>(`${SERVICES.exercise}/grade`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  health: async (): Promise<{ status: string }> => {
    return apiFetch<{ status: string }>(`${SERVICES.exercise}/health`);
  },
};

// ==================== CODE REVIEW API ====================

export interface ReviewRequest {
  code: string;
  context?: string;
  user_id?: string;
}

export interface ReviewResponse {
  overall_quality: string;
  issues: Array<{
    type: string;
    line: number;
    message: string;
    suggestion: string;
  }>;
  suggestions: string[];
  score: number;
}

export const codeReviewAPI = {
  review: async (data: ReviewRequest): Promise<ReviewResponse> => {
    return apiFetch<ReviewResponse>(`${SERVICES.codeReview}/review`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  health: async (): Promise<{ status: string }> => {
    return apiFetch<{ status: string }>(`${SERVICES.codeReview}/health`);
  },
};

// ==================== DEBUG API ====================

export interface DebugRequest {
  code: string;
  error_message: string;
  user_id?: string;
}

export interface DebugResponse {
  error_type: string;
  explanation: string;
  fix_suggestion: string;
  corrected_code: string;
  learning_tip: string;
}

export const debugAPI = {
  analyze: async (data: DebugRequest): Promise<DebugResponse> => {
    return apiFetch<DebugResponse>(`${SERVICES.debug}/analyze`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  health: async (): Promise<{ status: string }> => {
    return apiFetch<{ status: string }>(`${SERVICES.debug}/health`);
  },
};

// ==================== PROGRESS API ====================

export interface ProgressData {
  user_id: string;
  overall_mastery: number;
  modules_completed: number;
  current_module: string;
  modules: Record<string, Record<string, { mastery_score: number }>>;
}

export interface UpdateProgressRequest {
  user_id: string;
  module: string;
  topic: string;
  score: number;
  activity_type: 'quiz' | 'exercise' | 'lesson';
}

export const progressAPI = {
  getProgress: async (userId: string): Promise<ProgressData> => {
    return apiFetch<ProgressData>(`${SERVICES.progress}/progress/${userId}`);
  },

  updateProgress: async (data: UpdateProgressRequest): Promise<ProgressData> => {
    return apiFetch<ProgressData>(`${SERVICES.progress}/progress`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  health: async (): Promise<{ status: string }> => {
    return apiFetch<{ status: string }>(`${SERVICES.progress}/health`);
  },
};

// ==================== AI CHAT API ====================

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  user_id: string;
  context?: string;
}

export interface ChatResponse {
  response: string;
  agent_used: string;
}

export const chatAPI = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    // First route through triage
    const routing = await triageAPI.routeQuery({
      query: data.messages[data.messages.length - 1].content,
      user_id: data.user_id,
    });

    // Then call the appropriate agent
    if (routing.agent === 'concepts-agent') {
      const response = await conceptsAPI.explain({
        topic: data.messages[data.messages.length - 1].content,
        level: 'intermediate',
      });
      return {
        response: `${response.explanation}\n\nExamples:\n${response.examples.join('\n')}`,
        agent_used: routing.agent,
      };
    }

    // Default response
    return {
      response: routing.message,
      agent_used: routing.agent,
    };
  },
};

// ==================== UTILITY FUNCTIONS ====================

export const checkServicesHealth = async (): Promise<Record<string, boolean>> => {
  const services = ['triage', 'concepts', 'codeReview', 'debug', 'exercise', 'progress'] as const;
  const results: Record<string, boolean> = {};

  await Promise.all(
    services.map(async (service) => {
      try {
        const api = {
          triage: triageAPI,
          concepts: conceptsAPI,
          codeReview: codeReviewAPI,
          debug: debugAPI,
          exercise: exerciseAPI,
          progress: progressAPI,
        }[service];
        await api.health();
        results[service] = true;
      } catch {
        results[service] = false;
      }
    })
  );

  return results;
};
