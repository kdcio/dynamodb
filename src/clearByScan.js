import DDB from './ddb';
import deleteBulk from './deleteBulk';

// to delete, scan and delete one by one
// it's ok since it's test. do not do this in production
const clearByScan = async (key, value) => {
  const params = {
    FilterExpression: '#key = :value',
    ExpressionAttributeValues: { ':value': value },
    ExpressionAttributeNames: { '#key': key },
  };

  return DDB('scan', params).then(async (data) => {
    await deleteBulk(data.Items);
  });
};

export default clearByScan;
