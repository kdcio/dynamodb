import DDB from './ddb';

const deleteItem = async (item) => {
  const params = {
    Key: {
      pk: item.pk,
      sk: item.sk,
    },
  };

  await DDB('delete', params);
};

export default deleteItem;
