export interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  description: string;
  isbn: string;
  published_date: string;
  genre: string;
  rating: number;
  created_at: string;
}

export interface Review {
  id: string;
  book_id: string;
  user_id: string;
  rating: number;
  content: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  bio?: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
}