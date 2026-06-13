import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomeNavbar from "./components/layout/HomeNavbar";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AddressPage from "./pages/AddressPage/AddressPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

function Layout() {
  const location = useLocation();
  const isSearch =
    ["/search", "/cart"].includes(location.pathname) ||
    location.pathname === "/product" ||
    location.pathname.startsWith("/product/");
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  const isCheckoutFlow =
    location.pathname === "/checkout" ||
    location.pathname.startsWith("/checkout/") ||
    location.pathname === "/payment";
  const hideChrome = isAuthPage || isCheckoutFlow;

  // Reset scroll to top whenever the route changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ background: "#F9F8FF" }}>
      {!hideChrome && (isSearch ? <SearchNavbar /> : <HomeNavbar />)}
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/address" element={<AddressPage />} />
        <Route path="/checkout/address/:addressId" element={<AddressPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      {!hideChrome && <Footer />}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}
