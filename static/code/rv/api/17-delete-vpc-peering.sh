curl -s -X DELETE "https://$HOST/subscriptions/$SUBSCRIPTION_ID/peerings/$PEERING_ID" \
    --header "Content-Type: application/json" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" 