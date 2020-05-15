import DynamoDbLocal from 'dynamodb-local';

const { log } = console;
global.DDB_PORT = 8900;
module.exports = async () => {
  await DynamoDbLocal.launch(global.DDB_PORT, null, ['-sharedDb']);
  log('DynamoDB ready!');
};
