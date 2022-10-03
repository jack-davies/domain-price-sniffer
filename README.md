# Domain Property Price Sniffer

Sydney's delightful real estate agents have a bad habit of hiding the price range of properties for sale.

We can force disclosure of this useful information with a binary search over Domain's price filters.

## Instructions

### Requirements

- **Node.js** >= 18
- **podman**
- **jq**

### Usage

1. Create a developer account at https://developer.domain.com.au/. Create an API key and add it to `.env`.
2. Install dependencies with `npm install`.
3. Run `sh codegen.sh` to fetch the Domain OpenAPI spec and generate the TypeScript client library.
4. Compile the project with `npx tsc`.
5. Run the program:

```
$ node . https://www.domain.com.au/penthouse-803-85-harrington-street-sydney-nsw-2000-2017802819 > output.json
Calculating minimum asking price...
round: 1	bounds: [1000000, Infinity]
round: 2	bounds: [1500000, Infinity]
round: 3	bounds: [2250000, Infinity]
round: 4	bounds: [3380000, Infinity]
round: 5	bounds: [5070000, Infinity]
round: 6	bounds: [7610000, Infinity]
round: 7	bounds: [7610000, 11420000]
round: 8	bounds: [9520000, 11420000]
round: 9	bounds: [9520000, 10470000]
round: 10	bounds: [9520000, 10000000]
round: 11	bounds: [9760000, 10000000]
round: 12	bounds: [9880000, 10000000]
round: 13	bounds: [9940000, 10000000]
round: 14	bounds: [9970000, 10000000]
round: 15	bounds: [9990000, 10000000]

Calculating maximum asking price...
round: 1	bounds: [9990000, 11988000]
round: 2	bounds: [9990000, 10990000]
round: 3	bounds: [9990000, 10490000]
round: 4	bounds: [9990000, 10240000]
round: 5	bounds: [9990000, 10120000]
round: 6	bounds: [9990000, 10060000]
round: 7	bounds: [9990000, 10030000]
round: 8	bounds: [9990000, 10010000]
round: 9	bounds: [10000000, 10010000]

Estimated range: $9,990,000 - $10,010,000.
```
