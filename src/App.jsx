import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';

export default function App() {
  return (
    <Routes>
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  );
}