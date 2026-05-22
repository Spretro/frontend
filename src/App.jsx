import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ScrollToTop from "./components/ui/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
