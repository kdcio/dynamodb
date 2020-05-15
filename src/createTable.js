const AWS = require('aws-sdk');

const createTable = (schema) => {
  return new Promise((resolve) => {
    const dynamodb = new AWS.DynamoDB();
    const table = { ...schema, TableName: process.env.DDB_TABLE };
    dynamodb.createTable(table, () => {
      resolve();
    });
  });
};

module.exports = createTable;
