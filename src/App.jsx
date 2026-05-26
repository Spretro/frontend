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
