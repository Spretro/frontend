import { Navigate, Routes, Route } from 'react-router-dom';
import AddressPage from './pages/AddressPage/AddressPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import ProductPage from './pages/ProductPage/ProductPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/product" replace />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout/address" element={<AddressPage />} />
      <Route path="/checkout/address/:addressId" element={<AddressPage />} />
    </Routes>
  );
}
