# Spretro Frontend - Product Page

A modern, responsive React-based product page application built with Vite, Tailwind CSS, and React Router.

## 📋 Overview

This project is a fully functional e-commerce product page showcasing best practices in React development, responsive design, and user experience. The application displays detailed product information, images, pricing, reviews, and similar product recommendations.

## 🎯 Key Features

- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Product Gallery** - Interactive image carousel with thumbnail navigation
- **Product Info** - Dynamic pricing, size/color selection, quantity control
- **Reviews System** - Customer reviews display and review submission
- **Recommendations** - Curated product sections with responsive grid
- **Trust Badges** - Security, genuine product, and return policy indicators
- **Error Handling** - Comprehensive error boundaries and fallback UI
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The application will start at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/              # Reusable components
│   ├── Carousel.jsx         # Horizontal carousel utility
│   ├── ErrorBoundary.jsx   # Error handling wrapper
│   └── LoadingSkeletons.jsx # Loading states
│
├── pages/
│   └── ProductPage/         # Product page directory
│       ├── ProductPage.jsx  # Main product page
│       └── ProductPage.css  # Page-specific styles
│
├── components/sections/     # Product page sections
│   ├── ProductGallery.jsx
│   ├── ProductInfo.jsx
│   ├── ProductTabs.jsx
│   ├── ProductReviews.jsx
│   └── RecommendationSection.jsx
│
├── data/
│   ├── mockProduct.js      # Mock product data
│   └── MOCK_DATA.md        # Mock data docs
│
├── hooks/
│   └── useProduct.js       # Product data hook
│
├── lib/
│   └── productUtils.js     # Shared helpers/constants
│
├── App.jsx                 # Router configuration
├── main.jsx                # Entry point
└── index.css               # Global styles

public/                     # Static assets
```

## 🔧 Technologies Used

- **React 19.2** - UI library
- **Vite 8** - Build tool and dev server
- **React Router 7.15** - Client-side routing
- **Tailwind CSS 4.3** - Utility-first CSS
- **Lucide React** - Icon library
- **ESLint** - Code linting
- **Babel** - JavaScript compiler with React compiler

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+), `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#6A2CFF)
- **Secondary**: Black (#000000), White (#FFFFFF)
- **Accent**: Orange (#FF6A00), Red (#FF3B30)
- **Neutral**: Light Grey (#F5F5F7), Mid Grey (#BDBDBD)

### Typography
- **Font Family**: Inter, Roboto, system-ui, sans-serif
- **Weights**: 400, 500, 600, 700, 800

## 🧩 Main Components

### ProductPage
The main component that orchestrates all product-related sub-components.

### ProductGallery
- Image carousel with navigation
- Thumbnail gallery with scroll
- Error handling for missing images
- Lazy loading support

### ProductInfo
- Product header and description
- Pricing with discount percentage
- Size and color selection
- Quantity selector
- Add to cart functionality

### ProductReviews
- Display customer reviews
- Review submission form
- Rating display with stars
- Form validation

### ProductTabs
- Product specifications
- Detailed description
- Tab switching interface

### RecommendationSection
- Recommendation sections
- Curated product grids
- Responsive counts per breakpoint
- Optional "View All" CTA per section

## 🔗 Routing

```
/product             → Product page (default product)
/product/:productId  → Product page (specific product)
```

## 📊 Mock Data

Mock product data is stored in `src/data/mockProduct.js` and includes:
- Product details (name, brand, price, images)
- Size and color options
- Customer reviews
- Recommendation sets
- Special offers

## ⚙️ Configuration Files

### tailwind.config.js
Tailwind CSS configuration with custom colors and theme extensions.

### vite.config.js
Vite configuration with React plugin, Babel support, and Tailwind CSS integration.

### eslint.config.js
ESLint rules for code quality including React hooks validation.

## 🔐 Error Handling

- **Error Boundary**: Catches React component errors
- **Fallback UI**: Graceful error display with recovery options
- **Image Error Handling**: Placeholder images for failed loads
- **Validation**: Form and input validation with error messages

## 🚨 Known TODOs

- [ ] Replace mock data with actual API endpoints
- [ ] Implement real cart functionality
- [ ] Add user authentication
- [ ] Implement wishlist persistence
- [ ] Add image optimization
- [ ] Setup production API calls
- [ ] Add analytics tracking
- [ ] Implement payment integration

## 📚 Best Practices

### Component Structure
- Single responsibility per component
- Props validation with clear defaults
- Clear JSDoc comments for all functions
- Consistent naming conventions

### Performance
- Use `useCallback` for event handlers passed to children
- Use `useMemo` for expensive computations
- Lazy load images with `loading="lazy"`
- Avoid unnecessary re-renders

### Accessibility
- Use semantic HTML elements
- Include ARIA labels for interactive elements
- Support keyboard navigation
- Maintain proper color contrast

### Code Quality
- ESLint rules enforced
- Consistent formatting
- No unused imports or variables
- Clear error messages

## 🤝 Contributing

When adding new features:
1. Follow the existing component structure
2. Add JSDoc comments
3. Use existing utility functions
4. Test on multiple breakpoints
5. Update this documentation

## 📝 Development Guidelines

### Adding a New Component
1. Create in appropriate directory
2. Add JSDoc comments
3. Include prop defaults
4. Handle error cases
5. Test responsiveness

### Adding Utility Functions
1. Place in `lib/` directory
2. Add JSDoc comments
3. Export explicitly
4. Add unit tests if complex

### Styling
- Use Tailwind classes for styling
- Follow mobile-first approach
- Test on all breakpoints
- Use custom theme variables for colors

## 🐛 Debugging

Enable React development tools:
- React Developer Tools browser extension
- React Profiler for performance analysis
- Console for error tracking

## 📦 Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Ready for deployment.

## 📞 Support

For questions or issues, please refer to the documentation files:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project structure
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [COMPONENTS.md](./COMPONENTS.md) - Component documentation

---

**Last Updated**: June 2026
**Version**: 1.0.0
