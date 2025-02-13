import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { fetchFeaturedBooks } from '../store/slices/booksSlice';
import type { AppDispatch, RootState } from '../store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { featured } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchFeaturedBooks());
  }, [dispatch]);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-xl text-gray-600">
          Join our community of book lovers and share your thoughts
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{book.rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Link
          to="/books"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Browse All Books
        </Link>
      </section>
    </div>
  );
}