import DynamoDbLocal from 'dynamodb-local';

const { log } = console;
module.exports = async () => {
  DynamoDbLocal.stop(global.DDB_PORT);
  log('DynamoDB stopped!');
};
