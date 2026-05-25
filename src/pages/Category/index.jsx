import { useParams, Navigate } from "react-router-dom";
import ListingPage from "../listing";
import { LISTING_CONFIGS } from "../../data/listingConfigs";

export default function CategoryPage() {
  const { slug } = useParams();
  const config = LISTING_CONFIGS[slug];
  if (!config) return <Navigate to="/" replace />;
  // key forces full remount when slug changes, resetting all filter state
  return <ListingPage key={slug} config={config} />;
}
