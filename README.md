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
```
