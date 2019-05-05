TASK_ID=$(curl -s -X POST "https://$HOST/subscriptions" \
    --header "Content-Type: application/json" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    -d '
{
  "name": "My new subscription 12",
  "dryRun": true,
  "paymentMethodId": 8240,
  "memoryStorage": "RAM",
  "persistentStorageEncryption": true,
  "cloudProviders": [
    {
      "provider": "AWS",
      "cloudAccountId": 7033,
      "regions": [
        {
          "region": "us-east-1",
          "multipleAvailabilityZones": false,
          "preferredAvailabilityZones": [
            "us-east-1b"
          ],
          "networking": {
            "deploymentCIDR": "10.0.0.0/24",
            "vpcId": null
          }
        }
      ]
    }
  ],
  "databases": [
    {
      "name": "Redis-database-example",
      "protocol": "redis",
      "provider": "AWS",
      "region": "us-east-1",
      "memoryLimitInGb": 10,
      "supportOSSClusterApi": true,
      "dataPersistence": "none",
      "replication": true,
      "throughputMeasurement": {
        "by": "operations-per-second",
        "value": 10000
      },
      "modules": [
        {
          "databaseModuleName": "ReJSON",
          "parameters": {}
        }
      ],
      "quantity": 3,
      "averageItemSizeInBytes": 1000000
    }
  ]
}
' | jq -r .taskId )

echo "TASK_ID=$TASK_ID"


STATUS=""

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

curl -s -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq -r .status

curl -s -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq -r .response