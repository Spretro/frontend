import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroBanner from "./components/sections/HeroBanner";
import ShopByCategory from "./components/sections/ShopByCategory";
import CuratedCollections from "./components/sections/CuratedCollections";
import BeautySection from "./components/sections/BeautySection";
import JewellerySection from "./components/sections/JewellerySection";
import SectionDivider from "./components/ui/SectionDivider";

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">
      <Navbar />
      <main>
        <HeroBanner />
        <SectionDivider />
        <ShopByCategory />
        <SectionDivider />
        <CuratedCollections />
        <SectionDivider />
        <BeautySection />
        <SectionDivider />
        <JewellerySection />
      </main>
      <Footer />
    </div>
  );
}
