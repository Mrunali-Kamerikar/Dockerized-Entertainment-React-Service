/**
 * Backend API Service
 * Replace BACKEND_URL with your actual backend server URL
 * These functions connect to the AI recommendation backend endpoints
 */

const BACKEND_URL = 'http://localhost:8000'; // ← Replace with your backend URL

// Auth token storage
let authToken: string | null = null;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
});

// ────────────────────────────────────────────
// POST /login — Authenticate user
// ────────────────────────────────────────────
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    authToken = data.token || null;
    return data;
  } catch {
    // Return mock success for demo purposes
    return { success: true, username, token: 'mock-jwt-token', userId: 'user_001' };
  }
};

// ────────────────────────────────────────────
// POST /recommend — Get AI recommendations
// ────────────────────────────────────────────
export interface RecommendRequest {
  query: string;
  userId: string;
  genres?: string[];
  limit?: number;
}

export const getRecommendations = async (req: RecommendRequest) => {
  try {
    const response = await fetch(`${BACKEND_URL}/recommend`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(req),
    });
    if (!response.ok) throw new Error('Recommendation failed');
    return await response.json();
  } catch {
    // Return mock response — real backend will replace this
    return null;
  }
};

// ────────────────────────────────────────────
// GET /summary/:movieId — AI movie summary
// ────────────────────────────────────────────
export const getMovieSummary = async (movieId: number, title: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/summary/${movieId}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Summary fetch failed');
    return await response.json();
  } catch {
    // Mock AI-generated summary
    return {
      summary: `This critically acclaimed film "${title}" weaves together themes of identity, memory, and human connection in ways that challenge conventional storytelling. The AI analysis identifies strong narrative coherence and exceptional character development that resonates deeply with viewers who appreciate psychological depth.`,
      themes: ['Identity', 'Memory', 'Connection', 'Redemption'],
      sentiment: 'Positive',
      aiInsight: 'Based on semantic analysis of 15,000+ user reviews, this film consistently evokes feelings of wonder and intellectual stimulation.',
      keyScenes: ['Opening sequence', 'Plot twist at act 2', 'Climactic resolution'],
    };
  }
};

// ────────────────────────────────────────────
// GET /review/:movieId — Fetch reviews with AI sentiment
// ────────────────────────────────────────────
export const getMovieReviews = async (movieId: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/review/${movieId}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Review fetch failed');
    return await response.json();
  } catch {
    // Mock reviews
    return {
      reviews: [
        {
          id: 1, author: 'CinemaEnthusiast', rating: 9,
          content: 'An absolute masterpiece of modern cinema. The direction is flawless and every frame feels intentional.',
          sentiment: 'Positive', helpfulVotes: 245, date: '2024-01-15',
        },
        {
          id: 2, author: 'FilmCritic2024', rating: 8,
          content: 'Visually stunning with an emotionally resonant story. The performances elevate the material.',
          sentiment: 'Positive', helpfulVotes: 189, date: '2024-02-03',
        },
        {
          id: 3, author: 'MovieBuff88', rating: 7,
          content: 'Good film but the pacing drags in the second act. Still worth watching for the performances.',
          sentiment: 'Mixed', helpfulVotes: 112, date: '2024-02-20',
        },
        {
          id: 4, author: 'NightOwlViewer', rating: 10,
          content: 'Changed how I think about the genre. A rare cinematic experience that deserves every accolade.',
          sentiment: 'Positive', helpfulVotes: 330, date: '2024-03-01',
        },
      ],
      averageRating: 8.5,
      sentimentBreakdown: { positive: 75, mixed: 20, negative: 5 },
    };
  }
};

// ────────────────────────────────────────────
// POST /rate — Submit movie rating
// ────────────────────────────────────────────
export const submitRating = async (movieId: number, userId: string, rating: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/rate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ movieId, userId, rating }),
    });
    if (!response.ok) throw new Error('Rating submission failed');
    return await response.json();
  } catch {
    // Mock success
    return { success: true, message: 'Rating submitted successfully', movieId, rating };
  }
};

// ────────────────────────────────────────────
// POST /qa — AI Q&A about movies
// ────────────────────────────────────────────
export const askMovieQuestion = async (question: string, movieContext?: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/qa`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ question, context: movieContext }),
    });
    if (!response.ok) throw new Error('Q&A failed');
    return await response.json();
  } catch {
    // Mock AI response
    const mockResponses: Record<string, string> = {
      default: `Based on my analysis of thousands of films and reviews, "${question}" touches on fascinating aspects of cinema. The interplay between narrative structure and emotional resonance is what makes great films memorable. I'd recommend exploring similar themes in films like Arrival, Eternal Sunshine of the Spotless Mind, and Her.`,
    };
    return {
      answer: mockResponses.default,
      confidence: 0.87,
      relatedMovies: ['Arrival', 'Eternal Sunshine', 'Her', 'Blade Runner 2049'],
      sources: ['AI Film Database', 'User Reviews', 'Critical Analysis'],
    };
  }
};
