type Bound = "Lower" | "Upper";

function getListingId(input: string) {
  let res: number;

  try {
    res = parseInt(input.split("-").slice(-1)[0]);
  } catch (e: unknown) {
    res = parseInt(input);
  }

  if (isNaN(res))
    throw Error("Could not determine listing ID from input: " + input);
  return res;
}

function formatAUD(price: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(price);
}

export { formatAUD, getListingId };
