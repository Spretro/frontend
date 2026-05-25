import ListingPage from "../listing";
import { LISTING_CONFIGS } from "../../data/listingConfigs";

export default function Sale() {
  return <ListingPage config={LISTING_CONFIGS.sale} />;
}
