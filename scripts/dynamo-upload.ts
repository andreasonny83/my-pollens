import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import data from '../offline/migrations/seed.json';
import 'dotenv/config';

const REGION = process.env.AWS_REGION;
const TABLE_NAME = process.env.TABLE_NAME;

// Create a DynamoDB client
const client = new DynamoDBClient({ region: REGION });

// Create a DynamoDBDocumentClient using the DynamoDBClient
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Function to insert data into DynamoDB
async function insertData() {
  for (const item of data) {
    const params = {
      TableName: TABLE_NAME,
      Item: item,
    };

    try {
      await ddbDocClient.send(new PutCommand(params));
      console.log(`Inserted item with PK ${item.PK} and SK ${item.SK}`);
    } catch (error: any) {
      console.error(error?.message);
    }
  }
}

// Call the function to insert data
insertData();
