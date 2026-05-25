import HeroBanner from "../../components/sections/HeroBanner";
import PromoBanner from "../../components/sections/PromoBanner";
import ShopByCategory from "../../components/sections/ShopByCategory";
import CuratedCollections from "../../components/sections/CuratedCollections";
import TrendingProducts from "../../components/sections/TrendingProducts";
import StyleForHer from "../../components/sections/EthnicBanner";
import TrendingDeals from "../../components/sections/TrendingDeals";
import StyleForHim from "../../components/sections/BrandShowcase";
import BeautySection from "../../components/sections/BeautySection";
import HomeSection from "../../components/sections/OnTheRise";
import BagsSection from "../../components/sections/PickYourStyle";
import JewellerySection from "../../components/sections/JewellerySection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden" style={{ background: "#F9F8FF" }}>
      <HeroBanner />
      <PromoBanner />
      <ShopByCategory />
      <CuratedCollections />
      <TrendingProducts />
      <StyleForHer />
      <TrendingDeals />
      <StyleForHim />
      <BeautySection />
      <HomeSection />
      <BagsSection />
      <JewellerySection />
    </main>
  );
}
