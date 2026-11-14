import { ProductDatabase } from "./Database";

export const initializeDatabase = () => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, price REAL, description TEXT, image TEXT)',
      [],
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)',
      [],
    );
    // Seed demo account if missing.
    tx.executeSql(
      'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
      ['U', 'P'],
    );
  });
};

export const findUserByUsername = (username) =>
  new Promise((resolve, reject) => {
    ProductDatabase.transaction((tx) => {
      tx.executeSql(
        'SELECT id, username, password FROM users WHERE username = ? LIMIT 1',
        [username],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });

export const registerUser = (username, password) =>
  new Promise((resolve, reject) => {
    const trimmedUsername = String(username || '').trim();
    const trimmedPassword = String(password || '');

    if (!trimmedUsername || !trimmedPassword) {
      reject(new Error('Username and password are required'));
      return;
    }

    ProductDatabase.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [trimmedUsername, trimmedPassword],
        (_, results) => {
          resolve({
            id: results.insertId,
            username: trimmedUsername,
          });
        },
        (_, error) => {
          if (String(error?.message || '').toLowerCase().includes('unique')) {
            reject(new Error('Username already exists'));
          } else {
            reject(error || new Error('Failed to register user'));
          }
          return false;
        },
      );
    });
  });

export const authenticateUser = async (username, password) => {
  const user = await findUserByUsername(String(username || '').trim());
  if (!user) {
    return null;
  }
  if (user.password !== String(password || '')) {
    return null;
  }
  return {
    id: user.id,
    username: user.username,
  };
};

export const insertProduct = (product, onSuccess) => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)',
      [product.title, product.price, product.description, product.image],
      (_, results) => {
        if (onSuccess) {
          onSuccess(results.insertId);
        }
      },
      (_, error) => {
        console.error('Failed to insert product', error);
        return false;
      },
    );
  });
};

export const getProducts = (callback) => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql('SELECT * FROM products', [], (_, results) => {
      const products = [];
      for (let i = 0; i < results.rows.length; i += 1) {
        products.push(results.rows.item(i));
      }
      callback(products);
    });
  });
};

// Group cart rows by product title (SQLite id is unique per insert).
export const groupByCount = (cartItems = []) => {
  return cartItems.reduce((acc, item) => {
    const existingItem = acc.find(
      (groupedItem) => groupedItem.title === item.title,
    );
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);
};

export const groupByCount1 = (cartItems) => groupByCount(cartItems);

const updateProduct = (id, updatedProduct) => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql(
      'UPDATE products SET title=?, price=?, description=?, image=? WHERE id=?',
      [
        updatedProduct.title,
        updatedProduct.price,
        updatedProduct.description,
        updatedProduct.image,
        id,
      ],
      () => {
        console.log('Product updated, ID:', id);
      },
    );
  });
};

const deleteProduct = (id) => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql('DELETE FROM products WHERE id=?', [id], () => {
      console.log('Product deleted, ID:', id);
    });
  });
};
