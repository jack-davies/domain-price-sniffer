import { binarySearch, TestDirection } from "../lib/binary";
import {
  Configuration,
  ListingsApi,
  ListingsDetailedResidentialSearchRequest,
} from "../generated";
import * as dotenv from "dotenv";

dotenv.config();

type Bound = "Lower" | "Upper";

const config = new Configuration({
  apiKey: process.env.DOMAIN_API_KEY,
});
const listingsApi = new ListingsApi(config);

async function testPrice(opts: {
  listingId: number;
  value: number;
  bound: Bound;
  direction: TestDirection;
}) {
  const priceParams = {
    Lower: { maxPrice: opts.value },
    Upper: { minPrice: opts.value },
  }[opts.bound];

  const params: ListingsDetailedResidentialSearchRequest = {
    domainSearchServiceV2ModelDomainSearchWebApiV2ModelsSearchParameters: {
      adIds: [opts.listingId],
      ...priceParams,
    },
  };

  const zeroResults = await listingsApi
    .listingsDetailedResidentialSearch(params)
    .then((data) => data.length == 0);
  return {
    Lower: {
      GT: !zeroResults,
      LT: zeroResults,
    },
    Upper: {
      GT: zeroResults,
      LT: !zeroResults,
    },
  }[opts.bound][opts.direction];
}

async function testBounds(listingId: number) {
  const testLower = (value: number) =>
    testPrice({
      listingId: listingId,
      value: value,
      bound: "Lower",
      direction: "LT",
    });
  const testUpper = (value: number) =>
    testPrice({
      listingId: listingId,
      value: value,
      bound: "Upper",
      direction: "GT",
    });

  process.stderr.write("Calculating minimum asking price...\n");
  const lowerResult = await binarySearch((value) => testLower(value), "LT");
  process.stderr.write("\nCalculating maximum asking price...\n");
  const upperResult = await binarySearch((value) => testUpper(value), "GT", {
    lower: lowerResult.lower,
    initial: lowerResult.lower * 1.2,
  });

  return {
    lower: lowerResult,
    upper: upperResult,
    result: {
      lower: lowerResult.lower,
      upper: upperResult.upper,
      n: lowerResult.n + upperResult.n,
    },
  };
}

export { testBounds };
