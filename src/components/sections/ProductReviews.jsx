import { AlertCircle, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { getInitials, PRODUCT_LIMITS } from "../../lib/productUtils";

const emptyReviewForm = {
  rating: 0,
  title: "",
  review: "",
};

export default function ProductReviews({
  rating = 0,
  reviewCount = 0,
  reviews = [],
}) {
  const [writeOpen, setWriteOpen] = useState(false);
  const [formData, setFormData] = useState(emptyReviewForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFormData(emptyReviewForm);
    setFormErrors({});
  };

  const toggleWriteForm = () => {
    setWriteOpen((current) => !current);
    setSubmitted(false);
    resetForm();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
  };

  const setRating = (nextRating) => {
    setFormData((current) => ({ ...current, rating: nextRating }));
    setFormErrors((current) => ({ ...current, rating: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.rating) errors.rating = "Please select a rating.";
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (formData.review.trim().length < 10) {
      errors.review = "Review must be at least 10 characters.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // MOCK DATA START
      // TODO(BACKEND): Replace with POST /products/:id/reviews.
      await new Promise((resolve) => setTimeout(resolve, 500));
      // MOCK DATA END

      setSubmitted(true);
      resetForm();
    } catch {
      setFormErrors({
        submit: "Failed to submit review. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="reviews-heading"
      className="rounded-3xl border border-[#EEE8FF] bg-white p-4 md:p-6 "
      style={{ boxShadow: "0 2px 16px rgba(106,44,255,0.06)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-400 text-sm font-black text-gray-950">
            {rating}★
          </div>
          <div>
            <h2 id="reviews-heading" className="text-xl font-black text-gray-950">
              Customer Reviews
            </h2>
            <p className="text-xs font-bold text-gray-400">
              {reviewCount} verified ratings
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleWriteForm}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-black text-gray-700 transition-colors hover:border-[#6A2CFF] hover:text-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
          aria-expanded={writeOpen}
        >
          <MessageCircle size={15} />
          Write Review
        </button>
      </div>

      {reviews.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {reviews.slice(0, PRODUCT_LIMITS.reviewsPreviewCount).map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-gray-100 bg-[#F9F8FF] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F3EEFF] text-xs font-black text-[#6A2CFF]">
                    {getInitials(review.author)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black text-gray-950">
                      {review.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-400">
                      {review.author} · {review.date}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-gray-600">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-[#F9F8FF] p-8 text-center">
          <MessageCircle className="mx-auto mb-2 text-gray-400" size={30} />
          <p className="text-sm font-black text-gray-950">No reviews yet</p>
          <p className="text-xs font-medium text-gray-400">
            Be the first to review this product.
          </p>
        </div>
      )}

      {writeOpen && (
        <form
          className="mt-5 space-y-4 rounded-2xl border border-[#EEE8FF] p-4"
          onSubmit={handleSubmitReview}
          noValidate
        >
          {submitted && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
              Thank you. Your review will appear after moderation.
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-black text-gray-950">
              Rating
            </label>
            <div className="flex gap-1" role="radiogroup" aria-label="Review rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="rounded-full p-1 text-gray-300 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                  role="radio"
                  aria-checked={formData.rating === star}
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    size={28}
                    className={
                      star <= formData.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-current"
                    }
                  />
                </button>
              ))}
            </div>
            {formErrors.rating && (
              <p className="mt-1 text-xs font-bold text-rose-600">
                {formErrors.rating}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FieldErrorInput
              id="review-title"
              label="Title"
              name="title"
              value={formData.title}
              error={formErrors.title}
              onChange={handleInputChange}
              placeholder="Summary of your experience"
            />
            <div className="md:col-span-2">
              <label
                htmlFor="review-comment"
                className="mb-2 block text-sm font-black text-gray-950"
              >
                Review
              </label>
              <textarea
                id="review-comment"
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                placeholder="Share your experience with this product"
                rows={4}
                maxLength={500}
                className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/20"
                aria-invalid={Boolean(formErrors.review)}
                aria-describedby={formErrors.review ? "review-comment-error" : undefined}
              />
              <div className="mt-1 flex justify-between gap-3">
                {formErrors.review ? (
                  <p id="review-comment-error" className="text-xs font-bold text-rose-600">
                    {formErrors.review}
                  </p>
                ) : (
                  <span />
                )}
                <p className="text-xs font-medium text-gray-400">
                  {formData.review.length}/500
                </p>
              </div>
            </div>
          </div>

          {formErrors.submit && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {formErrors.submit}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={submitting}
              className="min-h-11 rounded-2xl bg-gray-950 px-4 text-sm font-black text-white transition-all hover:bg-[#6A2CFF] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={toggleWriteForm}
              disabled={submitting}
              className="min-h-11 rounded-2xl border border-gray-200 px-4 text-sm font-black text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex shrink-0 gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

function FieldErrorInput({ id, label, name, value, error, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-black text-gray-950">
        {label}
      </label>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={100}
        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-[#6A2CFF] focus:ring-2 focus:ring-[#6A2CFF]/20"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs font-bold text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
