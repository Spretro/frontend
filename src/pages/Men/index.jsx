import ListingPage from "../listing";
import { LISTING_CONFIGS } from "../../data/listingConfigs";

export default function Men() {
  return <ListingPage config={LISTING_CONFIGS.men} />;
}
