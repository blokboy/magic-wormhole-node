const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let cachedDb = null;

const connectToDatabase = (uri) => {
  if(cachedDb) {
    return cachedDb;
  }
 
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
};

const get = async (tbl) => {
  return await cachedDb.collection(tbl).find({});
};

const findBy = async (tbl, filter) => {
  return await cachedDb.collection(tbl).findOne(filter);
};

const findAllBy = async (tbl, filter) => {
  return await cachedDb.collection(tbl).find(filter);
};

const add = async (tbl, data) => {
  return await cachedDb.collection(tbl).insert(data);
};

const remove = async (tbl, id) => {
  return await cachedDb(tbl).remove({ id });
};

const update = async (tbl, id, data) => {
  return await db(tbl).update({ id }, { data });
};

module.exports = {
  connectToDatabase,
  get,
  findBy,
  findAllBy,
  add,
  remove,
  update,
};
