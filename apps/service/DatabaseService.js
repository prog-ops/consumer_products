import { ProductDatabase } from "./Database";

export const initializeDatabase = () => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, price REAL, description TEXT, image TEXT)',
      [],
    );
  });
};

export const insertProduct = (product) => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)',
      [product.title, product.price, product.description, product.image],
      (tx, results) => {
        console.log('Product inserted, ID:', results.insertId);
      },
    );
  });
};

export const getProducts = (callback) => {
  ProductDatabase.transaction((tx) => {
    tx.executeSql('SELECT * FROM products', [], (_, results) => {
      const products = results.rows.raw();
      callback(products);
    });
  });
};

// Utility function to group cart items by count
export const groupByCount = (cartItems) => {
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(
      (groupedItem) => groupedItem.id === item.id && groupedItem.title === item.title
    );
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  return groupedItems;
};

/*
Red Trouser
Quantity: 1
Green Shirt
Quantity: 1
Green Shirt
Quantity: 1
Green Shirt
Quantity: 1
Yellow Cap
Quantity: 1
 */
export const groupByCount1 = (cartItems) => {
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((groupedItem) => groupedItem.id === item.id);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  return groupedItems;
};

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
