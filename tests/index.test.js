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

  it.todo('should clear by GSI');
  it.todo('should clear by Scan');
});
