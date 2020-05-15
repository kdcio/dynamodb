import DDB from './ddb';
import deleteBulk from './deleteBulk';

// To clear everything, scan and delete one by one
// Do not do this in production
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
