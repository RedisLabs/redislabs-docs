TASK_ID=$(curl -s -X POST "https://$HOST/subscriptions" \
    --header "Content-Type: application/json" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    --data-binary "@./static/code/rv/api/100-create-subscription-basic.json" \
    | jq -r .taskId )

echo "TASK_ID=$TASK_ID"

STATUS="received"

while [ "$STATUS" != "processing-completed" ]
do
    sleep 3 # seconds   
    STATUS=$(curl -s -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq -r .status)
    echo "STATUS=$STATUS"
done

echo "Response: "

curl -s -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq -r .



