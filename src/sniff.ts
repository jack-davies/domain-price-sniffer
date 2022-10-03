import { testBounds } from "../lib/api";
import { formatAUD, getListingId } from "../lib/listing";

const input = process.argv.slice(-1)[0];
const listingId = getListingId(input);

testBounds(listingId).then((data) => {
  process.stderr.write(
    "\nEstimated range: " +
      formatAUD(data.result.lower) +
      " - " +
      formatAUD(data.result.upper) +
      ".\n\n"
  );
  process.stdout.write(JSON.stringify(data) + "\n");
});
