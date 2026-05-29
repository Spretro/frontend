import { Star, MessageCircle, AlertCircle } from 'lucide-react';
import { useState, useCallback } from 'react';
import { getInitials } from '../../../utils/helpers';
import { PRODUCT_CONSTANTS } from '../../../utils/constants';

/**
 * ProductReviews Component
 * Displays customer reviews and allows writing new reviews
 */
export default function ProductReviews({ rating = 0, reviews = [] }) {
  const [writeOpen, setWriteOpen] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    review: '',
    author: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /**
   * Reset form
   */
  const resetForm = useCallback(() => {
    setFormData({ rating: 0, title: '', review: '', author: '' });
    setFormErrors({});
    setSubmitted(false);
  }, []);

  /**
   * Toggle form visibility
   */
  const toggleWriteForm = useCallback(() => {
    setWriteOpen(!writeOpen);
    if (!writeOpen) {
      resetForm();
    }
  }, [writeOpen, resetForm]);

  /**
   * Handle form input change
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [formErrors]);

  /**
   * Set rating
   */
  const setRating = useCallback((ratingValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: ratingValue,
    }));
    if (formErrors.rating) {
      setFormErrors((prev) => ({
        ...prev,
        rating: '',
      }));
    }
  }, [formErrors]);

  /**
   * Validate form
   */
  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.rating) {
      errors.rating = 'Please select a rating';
    }
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.review.trim()) {
      errors.review = 'Review is required';
    }
    if (formData.review.trim().length < 10) {
      errors.review = 'Review must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  /**
   * Handle form submission
   */
  const handleSubmitReview = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      // TODO: Replace with actual API call
      // const response = await fetch(API_ENDPOINTS.SUBMIT_REVIEW, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     productId,
      //     ...formData,
      //   }),
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
      resetForm();

      // Auto-close after 3 seconds
      setTimeout(() => {
        setWriteOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setFormErrors({
        submit: 'Failed to submit review. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  }, [validateForm, resetForm]);

  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  return (
    <section aria-label="Reviews" className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star size={20} className="text-brand-orange fill-brand-orange" />
            <span className="text-lg sm:text-xl font-bold text-black">{rating || '0'}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-black">Customer Reviews</h2>
        </div>
        <button
          onClick={toggleWriteForm}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-500 hover:text-purple-600 transition"
          aria-label="Write a review"
        >
          <MessageCircle size={16} />
          Write review
        </button>
      </div>

      {/* Reviews list */}
      {displayReviews.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {displayReviews.slice(0, PRODUCT_CONSTANTS.REVIEWS_PER_PAGE).map((review, index) => (
            <div key={`review-${index}`} className="rounded border border-gray-300 bg-white p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-purple-600">
                    {getInitials(review.author || 'Anonymous')}
                  </div>
                  <h3 className="font-semibold text-black text-sm sm:text-base truncate">
                    {review.title || 'Untitled Review'}
                  </h3>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < (review.rating || 4)
                          ? 'text-brand-orange fill-brand-orange'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">{review.comment || 'No comment'}</p>
              <p className="text-gray-400 text-xs">
                {review.author || 'Anonymous'} • {review.date || 'Recently'}
              </p>
            </div>
          ))}

          {/* View all reviews button */}
          {displayReviews.length > PRODUCT_CONSTANTS.REVIEWS_PER_PAGE && (
            <button 
              className="w-full text-center py-2 text-purple-500 font-semibold hover:text-purple-600 hover:underline text-sm transition"
              aria-label={`View all ${displayReviews.length} reviews`}
            >
              View all reviews ({displayReviews.length})
            </button>
          )}
        </div>
      ) : (
        <div className="rounded border border-dashed border-gray-300 bg-white p-6 sm:p-8 text-center text-sm text-gray-500">
          <MessageCircle size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="font-semibold text-black">No reviews yet</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Be the first to review this product</p>
        </div>
      )}

      {/* Write review form */}
      {writeOpen && (
        <div className="rounded border border-gray-300 bg-white p-4 sm:p-6 space-y-4">
          {submitted && !submitting && (
            <div className="rounded border border-green-300 bg-green-50 p-4 text-green-700 flex items-start gap-2">
              <Star size={20} className="fill-green-600 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Thank you for your review!</p>
                <p className="text-sm">Your review will be displayed after moderation.</p>
              </div>
            </div>
          )}

          <h3 className="font-bold text-black text-lg">Write a Review</h3>

          {/* Rating selection */}
          <div>
            <label className="block text-sm font-semibold text-black mb-3">
              Rating {formErrors.rating && <span className="text-red-500 text-xs">*</span>}
            </label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className="p-1 hover:scale-110 transition"
                  aria-label={`Rate ${i + 1} stars`}
                  aria-pressed={formData.rating === i + 1}
                >
                  <Star
                    size={28}
                    className={
                      i < formData.rating
                        ? 'text-brand-orange fill-brand-orange'
                        : 'text-gray-300 hover:text-brand-orange'
                    }
                  />
                </button>
              ))}
            </div>
            {formErrors.rating && (
              <p className="text-red-500 text-xs mt-1">{formErrors.rating}</p>
            )}
          </div>

          {/* Title input */}
          <div>
            <label htmlFor="review-title" className="block text-sm font-semibold text-black mb-2">
              Title {formErrors.title && <span className="text-red-500 text-xs">*</span>}
            </label>
            <input
              id="review-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Summary of your experience"
              maxLength={100}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {formErrors.title && (
              <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* Review textarea */}
          <div>
            <label htmlFor="review-comment" className="block text-sm font-semibold text-black mb-2">
              Review {formErrors.review && <span className="text-red-500 text-xs">*</span>}
            </label>
            <textarea
              id="review-comment"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Share your experience with this product..."
              rows="4"
              maxLength={500}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
            />
            <div className="flex justify-between mt-1">
              {formErrors.review && (
                <p className="text-red-500 text-xs">{formErrors.review}</p>
              )}
              <p className="text-gray-400 text-xs ml-auto">
                {formData.review.length}/500
              </p>
            </div>
          </div>

          {/* Error message */}
          {formErrors.submit && (
            <div className="rounded border border-red-300 bg-red-50 p-3 text-red-700 flex items-start gap-2 text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <p>{formErrors.submit}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="flex-1 rounded bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              onClick={toggleWriteForm}
              disabled={submitting}
              className="flex-1 rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
