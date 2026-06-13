import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Error Boundary Component
 * Catches errors in child components and displays a fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full bg-red-50 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We encountered an error while loading this page. Please try again.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-gray-100 p-4 rounded mb-4 text-left overflow-auto max-h-48">
                <p className="text-red-600 text-sm font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
