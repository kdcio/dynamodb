import DynamoDB from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk/global';

const createTable = (schema) => {
  const awsConfigs = {};
  const { DDB_REGION, DDB_ENDPOINT, DDB_TABLE } = process.env;
  if (DDB_REGION) awsConfigs.region = DDB_REGION;
  if (DDB_ENDPOINT) awsConfigs.endpoint = new AWS.Endpoint(DDB_ENDPOINT);

  return new Promise((resolve, reject) => {
    const dynamodb = new DynamoDB(awsConfigs);
    const table = { ...schema, TableName: DDB_TABLE };
    dynamodb.createTable(table, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export default createTable;
