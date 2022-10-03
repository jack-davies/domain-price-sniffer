set -euo pipefail

# Download Domain OpenAPI spec
if [ ! -f openapi.json ]; then
    wget -O openapi.json https://developer.domain.com.au/static/latest/media/latest/openapi.json
fi

# Fix validation errors in schema
cat openapi.json |
    jq 'del(.paths."/v2/demographics/{state}/{suburb}")
        | (.paths."/v2/demographics/{state}/{suburb}/{postcode}".get.parameters[]
            | select(.name == "postcode").required) = true
        | (.paths."/v1/properties/_suggest".get.parameters[]
            | select(.name == "channel").schema.default) = "All"
        | del(.paths."/v2/suburbPerformanceStatistics/{state}/{suburb}")
        | (.paths."/v2/suburbPerformanceStatistics/{state}/{suburb}/{postcode}".get.parameters[]
            | select(.name == "postcode").required) = true' > openapi.fixed.json

# Generate TypeScript client
podman run --rm -v "${PWD}:/local:z" openapitools/openapi-generator-cli generate \
    -i /local/openapi.fixed.json \
    -g typescript-fetch \
    -o /local/generated
