import DDB from './ddb';
import deleteBulk from './deleteBulk';

// to delete, query via gsi and delete one by one
// it's since it's test. do not do this in production
const clearByGSI = async (key) => {
  const params = {
    IndexName: 'GS1',
    KeyConditionExpression: 'gs1pk = :pk',
    ExpressionAttributeValues: {
      ':pk': key,
    },
  };

  return DDB('query', params).then(async (data) => {
    await deleteBulk(data.Items);
  });
};

export default clearByGSI;
