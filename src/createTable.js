import AWS from 'aws-sdk';

const awsConfigs = {};
const { DDB_REGION, DDB_ENDPOINT, DDB_TABLE } = process.env;
if (DDB_REGION) awsConfigs.region = DDB_REGION;
if (DDB_ENDPOINT) awsConfigs.endpoint = DDB_ENDPOINT;
AWS.config.update(awsConfigs);

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    const dynamodb = new AWS.DynamoDB();
    const table = { ...schema, TableName: DDB_TABLE };
    dynamodb.createTable(table, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export default createTable;
