// Product page constants
export const PRODUCT_CONSTANTS = {
  THUMBNAIL_COUNT: 4,
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1,
  IMAGE_PLACEHOLDER: 'https://via.placeholder.com/400x500?text=Product+Image',
  REVIEWS_PER_PAGE: 3,
  SIMILAR_ITEMS_COUNT: 8,
  SIMILAR_ITEMS_GRID_COLS: 4,
};

export const TAB_TYPES = {
  SPECIFICATIONS: 'specifications',
  DESCRIPTION: 'description',
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const API_ENDPOINTS = {
  GET_PRODUCT: '/api/products',
  ADD_TO_CART: '/api/cart/add',
  GET_SIMILAR_PRODUCTS: '/api/products/:id/similar',
  SUBMIT_REVIEW: '/api/reviews/submit',
};

export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found. Please try again.',
  FETCH_ERROR: 'Failed to fetch product. Please refresh the page.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please fill in all required fields.',
  SIZE_COLOR_ERROR: 'Please select both size and color before adding to cart.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Added to cart successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
  QUANTITY_UPDATED: 'Quantity updated.',
};
