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
  return await db(tbl);
};

const findBy = async (tbl, filter) => {
  return await db(tbl).where(filter).first();
};

const findAllBy = async (tbl, filter) => {
  return db(tbl).where(filter);
};

const add = async (tbl, data) => {
  return await db(tbl).insert(data);
};

const remove = async (tbl, id) => {
  return await db(tbl).where({ id }).del();
};

const update = async (tbl, id, data) => {
  return await db(tbl).where({ id }).update(data);
};

const register = async ({ first_name, last_name, password, email }) => {
  try {
    const hash = bcrypt.hashSync(password, 12);
    const newUser = { first_name, last_name, password: hash, email };
    const [ id ] = await add('Users', newUser);
    const token = await generateAuthToken(id); // does this need await?
    return token;
  } catch({ err }) {
    return err;
  }
};

const login = async ({ email, password }) => {
  try {
    const userWasFound = await findBy('Users', { email });
    
    if(userWasFound) {
      const loginWasSuccessful = bcrypt.compareSync(password, userWasFound.password);
      if(loginWasSuccessful) {
        const token = await generateAuthToken(userWasFound);
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch({ err }) {
    return err;
  }
};

module.exports = {
  connectToDatabase,
  get,
  findBy,
  findAllBy,
  add,
  remove,
  update,
  register,
  login
};
