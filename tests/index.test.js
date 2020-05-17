import ddb from '../src';
import schema from './fixtures/schema.json';

const { log } = console;

describe('ddb', () => {
  it('should create table', async () => {
    const { createTable } = ddb;
    expect.assertions(0);
    try {
      await createTable(schema);
    } catch (error) {
      log(error);
      expect(error).toBeUndefined();
    }
  });

  it('should execute operations', async () => {
    const { DDB } = ddb;
    const params = {
      Item: {
        pk: 'PK',
        sk: 'SK',
      },
    };

    expect.assertions(5);
    try {
      await DDB('put', params);
      const ret = await DDB('get', { Key: { pk: 'PK', sk: 'SK' } });
      expect(ret).toHaveProperty('Item');
      expect(ret.Item).toHaveProperty('pk');
      expect(ret.Item).toHaveProperty('sk');
      expect(ret.Item.pk).toBe('PK');
      expect(ret.Item.sk).toBe('SK');
    } catch (error) {
      log(error);
    }
  });

  it('should clear by GSI', async () => {
    const { DDB, clearByGSI } = ddb;
    const key = {
      pk: 'PK',
      sk: 'SK',
      pk2: 'PK_GSI',
      sk2: 'SK_GSI',
    };
    // const params = { Item: key };

    expect.assertions(6);
    try {
      await DDB('put', { Item: key });

      const params = {
        IndexName: 'GSI',
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: { '#pk': 'pk2' },
        ExpressionAttributeValues: { ':pk': 'PK_GSI' },
      };

      let ret = await DDB('query', params);
      expect(ret).toHaveProperty('Items');
      expect(ret.Count).toBe(1);
      expect(ret.Items[0].pk2).toBe('PK_GSI');
      expect(ret.Items[0].sk2).toBe('SK_GSI');

      await clearByGSI({
        fieldName: 'pk2',
        fieldValue: 'PK_GSI',
        indexName: 'GSI',
      });

      ret = await DDB('query', params);
      expect(ret).toHaveProperty('Items');
      expect(ret.Count).toBe(0);
    } catch (error) {
      log(error);
    }
  });

  it('should clear by Scan', async () => {
    const { DDB, clearByScan } = ddb;
    const key = { pk: 'PK_SCAN', sk: 'SK_SCAN' };
    const params = { Item: key };

    expect.assertions(4);
    try {
      await DDB('put', params);

      let ret = await DDB('get', { Key: key });
      expect(ret).toHaveProperty('Item');
      expect(ret.Item.pk).toBe('PK_SCAN');
      expect(ret.Item.sk).toBe('SK_SCAN');

      await clearByScan('pk', 'PK_SCAN');

      ret = await DDB('get', { Key: key });
      expect(ret).toStrictEqual({});
    } catch (error) {
      log(error);
    }
  });
});
