import HeroBanner from "../../components/sections/HeroBanner";
import ShopByCategory from "../../components/sections/ShopByCategory";
import CuratedCollections from "../../components/sections/CuratedCollections";
import BeautySection from "../../components/sections/BeautySection";
import JewellerySection from "../../components/sections/JewellerySection";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <HeroBanner />
      <div className="h-8" />
      <ShopByCategory />
      <div className="h-8" />
      <CuratedCollections />
      <div className="h-8" />
      <BeautySection />
      <div className="h-8" />
      <JewellerySection />
    </main>
  );
}
