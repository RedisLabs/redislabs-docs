TASK_ID=$(curl -X POST "https://$HOST/subscriptions" \
    --header "Content-Type: application/json" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    -d '
{
  "name": "My new subscription 10",
  "dryRun": false,
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
      "quantity": 1,
      "averageItemSizeInBytes": 1024
    }
  ]
}
' | jq -r .taskId )

echo "TASK_ID=$TASK_ID"

sleep 5 # seconds

curl -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq -r .status

sleep 5 # seconds

curl -X GET "https://$HOST/tasks/$TASK_ID" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq 
