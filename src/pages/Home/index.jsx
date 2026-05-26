import HeroBanner from "../../components/sections/home/HeroBanner";
import PromoBanner from "../../components/sections/home/PromoBanner";
import ShopByCategory from "../../components/sections/home/ShopByCategory";
import CuratedCollections from "../../components/sections/home/CuratedCollections";
import TrendingProducts from "../../components/sections/home/TrendingProducts";
import StyleForHer from "../../components/sections/home/EthnicBanner";
import TrendingDeals from "../../components/sections/home/TrendingDeals";
import StyleForHim from "../../components/sections/home/BrandShowcase";
import BeautySection from "../../components/sections/home/BeautySection";
import HomeSection from "../../components/sections/home/OnTheRise";
import BagsSection from "../../components/sections/home/PickYourStyle";
import JewellerySection from "../../components/sections/home/JewellerySection";

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
