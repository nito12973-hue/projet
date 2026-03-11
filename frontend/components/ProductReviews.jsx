'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getDateLocale } from '@/lib/i18n';
import { createProductReview } from '@/services/api';

const RATING_OPTIONS = [1, 2, 3, 4, 5];

export default function ProductReviews({ productId, initialReviews = [] }) {
  const router = useRouter();
  const { user } = useAuth();
  const { locale, messages } = useLanguage();
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length;
  }, [reviews]);

  const sortedReviews = useMemo(
    () => [...reviews].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    [reviews]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error(messages.reviews.connectToLeave);
      return;
    }

    if (!comment.trim()) {
      toast.error(messages.reviews.addComment);
      return;
    }

    setSubmitting(true);
    try {
      const data = await createProductReview(productId, { rating, comment: comment.trim() });
      setReviews((current) => [data.review, ...current]);
      setComment('');
      setRating(5);
      toast.success(data.message || messages.reviews.added);
      router.refresh();
    } catch (error) {
      toast.error(error.message || messages.reviews.addFailed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">{messages.reviews.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{reviews.length} {messages.productPage.reviews.toLowerCase()} · {messages.reviews.average} {averageRating.toFixed(1)} / 5</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={18} fill="currentColor" />
            <span className="font-bold">{averageRating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {sortedReviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-500 dark:border-slate-700">
              {messages.reviews.noReviews}
            </div>
          ) : (
            sortedReviews.map((review) => (
              <div key={review._id} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">{review.user?.name || messages.reviews.customer}</p>
                    <p className="text-xs text-slate-500">{new Date(review.createdAt || Date.now()).toLocaleDateString(getDateLocale(locale))}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">{review.rating} / 5</span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel h-fit p-6">
        <h3 className="text-xl font-black">{messages.reviews.leave}</h3>
        <p className="mt-2 text-sm text-slate-500">{messages.reviews.help}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {RATING_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${rating === value ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-200 dark:border-slate-700'}`}
            >
              {value} {messages.reviews.stars}{value > 1 ? 's' : ''}
            </button>
          ))}
        </div>

        <textarea
          required
          rows={5}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="input-field mt-4"
          placeholder={messages.reviews.placeholder}
        />

        {!user ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700">
            {messages.reviews.loginPrompt}
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/login" className="btn-primary">{messages.reviews.login}</Link>
              <Link href="/register" className="btn-secondary">{messages.reviews.register}</Link>
            </div>
          </div>
        ) : null}

        <button disabled={!user || submitting} className="btn-primary mt-6 w-full disabled:opacity-50">
          {submitting ? messages.reviews.publishing : messages.reviews.publish}
        </button>
      </form>
    </div>
  );
}