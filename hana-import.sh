#!/usr/bin/env bash

credentials=$(cf service-key rtwp-hdi-hana rtwp-hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

echo "{\"hana\": $credentials }" > ./default-services.json

npm run clean
npm run import
