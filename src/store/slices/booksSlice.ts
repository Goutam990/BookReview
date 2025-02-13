import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { Book } from '../../types';

interface BooksState {
  items: Book[];
  featured: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  featured: [],
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
});

export const fetchFeaturedBooks = createAsyncThunk(
  'books/fetchFeaturedBooks',
  async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('featured', true)
      .limit(5);

    if (error) throw error;
    return data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch books';
      })
      .addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
        state.featured = action.payload;
      });
  },
});

export default booksSlice.reducer;