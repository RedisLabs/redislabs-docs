curl -s -X GET "https://$HOST/subscriptions/$SUBSCRIPTION_ID/peerings" \
    --header "Content-Type: application/json" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" 