import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SearchNavbar from "./components/layout/SearchNavbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import NewIn from "./pages/NewIn";
import Brands from "./pages/Brands";
import Sale from "./pages/Sale";
import CategoryPage from "./pages/Category";
import SearchPage from "./pages/Search";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Faqs from "./pages/Faqs";
import TermsAndConditions from "./pages/TermsAndConditions";
import Sitemap from "./pages/Sitemap";
import Careers from "./pages/Careers";

function Layout() {
  const location = useLocation();
  const isSearch = location.pathname === "/search";

  return (
    <div className="min-h-screen" style={{ background: "#F9F8FF" }}>
      {isSearch ? <SearchNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/new-in" element={<NewIn />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
