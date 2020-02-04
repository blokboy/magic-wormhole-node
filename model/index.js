/*
  Here is the most abstracted "model" for interacting with our database using general queries
  and simple login functionality. We can call these functions from within our routes to decide
  how to interact with our DB as specified in the first require statement.
*/

const db = require('knex')(require('../knexfile').development);
const bcrypt = require('bcryptjs');

const { generateAuthToken } = require('../utils');

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
  get,
  findBy,
  findAllBy,
  add,
  remove,
  update,
  register,
  login
};
