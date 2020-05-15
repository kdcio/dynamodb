import AWS from 'aws-sdk';

const awsConfigs = {};
const { DDB_REGION, DDB_ENDPOINT, DDB_TABLE } = process.env;
if (DDB_REGION) awsConfigs.region = DDB_REGION;
if (DDB_ENDPOINT) awsConfigs.endpoint = DDB_ENDPOINT;

AWS.config.update(awsConfigs);

const client = new AWS.DynamoDB.DocumentClient();
const TableName = DDB_TABLE;

const DDB = async (action, params) => {
  let actualParams = { TableName, ...params };
  if (action === 'transactWrite') {
    actualParams = { TransactItems: [] };
    params.TransactItems.forEach((p) => {
      Object.keys(p).forEach((act) => {
        const req = {
          [act]: { TableName, ...p[act] },
        };
        actualParams.TransactItems.push(req);
      });
    });

    const req = client[action](actualParams);
    req.on('extractError', (response) => {
      try {
        const reasons = JSON.parse(response.httpResponse.body.toString())
          .CancellationReasons;
        // eslint-disable-next-line no-console
        console.log(reasons);
      } catch (err) {
        // suppress this just in case some types of errors aren't JSON objects
        // eslint-disable-next-line no-console
        console.error('Error extracting cancellation error', err);
      }
    });

    return req.promise();
  }
  return client[action](actualParams).promise();
};

export default DDB;
