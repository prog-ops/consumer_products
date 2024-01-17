// CartService.js
import SQLite from 'react-native-sqlite-storage';

import {enablePromise} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'UserDatabase',
  location: 'default'
});

export const createTable = async () => {
  const query_create = `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,
      mobileNo TEXT NOT NULL UNIQUE, password TEXT NOT NULL
  );`;
  try {
    await db.executeSql(query_create);
  } catch (err) {
    console.log({err});
  }
};

export const insertData = async () => {
  const query_insert = 'INSERT INTO users (name, mobileNo ,password) VALUES (?, ?, ?)';
  const params = ['Xyz', '1234567890', '123'];

  try {
    await db.executeSql(query_insert, params);
  } catch (err) {
    console.log('err', err);
  }
};

export const updateData = async () => {
  const query_update = 'UPDATE users SET mobileNo = ? WHERE id = ?';
  const params = ['9879879879','1']

  try {
    await db.executeSql(query_update, params);
  } catch (err) {
    console.log('err', err);
  }
};

export const deleteData = async () => {
  const query_delete = 'DELETE FROM users WHERE id = ?';
  const params = ['1']

  try {
    await db.executeSql(query_delete, params);
  } catch (err) {
    console.log('err', err);
  }
};

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

/*const db = SQLite.openDatabase(
  { name: 'my.db', location: 'default' },
  () => {},
  (error) => {
    console.error(error);
  }
);*/

const handleAddToCart = (userId, productId) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO cart (user_id, product_id) VALUES (?, ?)',
      [userId, productId],
      () => {
        console.log('Product added to cart');
      },
      (error) => {
        console.error(error);
      }
    );
  });
};

export default handleAddToCart;
