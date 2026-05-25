import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import NewIn from "./pages/NewIn";
import Brands from "./pages/Brands";
import Sale from "./pages/Sale";
import CategoryPage from "./pages/Category";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: "#F9F8FF" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/new-in" element={<NewIn />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}
