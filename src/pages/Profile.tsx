import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../lib/supabase';
import type { RootState } from '../store';
import type { Review } from '../types';

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{
    username: string;
    avatar_url?: string;
    bio?: string;
  } | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch user's reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`
            *,
            books (
              title,
              author,
              cover_url
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        Please sign in to view your profile.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.username || '')}`}
            alt={profile?.username}
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">{profile?.username}</h1>
            <p className="text-gray-600">{profile?.bio || 'No bio provided'}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">You haven't written any reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={(review.books as any).cover_url}
                      alt={(review.books as any).title}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {(review.books as any).title}
                    </h3>
                    <p className="text-gray-600">
                      by {(review.books as any).author}
                    </p>
                    <div className="mt-4">
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}