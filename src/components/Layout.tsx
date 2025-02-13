import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function Layout() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BookReviews</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/books"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Browse Books
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 BookReviews. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}