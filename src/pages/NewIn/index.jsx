import ListingPage from "../listing";
import { LISTING_CONFIGS } from "../../data/listingConfigs";

export default function NewIn() {
  return <ListingPage config={LISTING_CONFIGS["new-in"]} />;
}
