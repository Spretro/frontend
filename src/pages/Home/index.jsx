import HeroBanner from "../../components/sections/HeroBanner";
import TrendingDeals from "../../components/sections/TrendingDeals";
import BrandShowcase from "../../components/sections/BrandShowcase";
import TrendingProducts from "../../components/sections/TrendingProducts";
import ShopByCategory from "../../components/sections/ShopByCategory";
import CuratedCollections from "../../components/sections/CuratedCollections";
import CustomerReviews from "../../components/sections/CustomerReviews";
import BeautySection from "../../components/sections/BeautySection";
import JewellerySection from "../../components/sections/JewellerySection";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <HeroBanner />
      <TrendingDeals />
      <div className="h-4 md:h-8" />
      <TrendingProducts />
      <div className="h-4 md:h-8" />
      <BrandShowcase />
      <div className="h-4 md:h-8" />
      <ShopByCategory />
      <div className="h-4 md:h-8" />
      <CuratedCollections />
      <div className="h-4 md:h-8" />
      <CustomerReviews />
      <div className="h-4 md:h-8" />
      <BeautySection />
      <div className="h-4 md:h-8" />
      <JewellerySection />
    </main>
  );
}
