import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ProductDatabase } from "../service/Database";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

const readRows = (results) => {
  const items = [];
  for (let i = 0; i < results.rows.length; i += 1) {
    items.push(results.rows.item(i));
  }
  return items;
};

const CartProvider = ({ children }) => {
  const [productCount, setProductCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateProductCount = useCallback(() => {
    ProductDatabase.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM products',
        [],
        (_, results) => {
          const count = results.rows.item(0).count;
          setProductCount(count);
        },
        (_, error) => {
          console.error('Failed to count cart products', error);
          return false;
        },
      );
    });
  }, []);

  const updateCartItems = useCallback(() => {
    ProductDatabase.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (_, results) => {
          setCartItems(readRows(results));
        },
        (_, error) => {
          console.error('Failed to load cart products', error);
          return false;
        },
      );
    });
  }, []);

  const refreshCart = useCallback(() => {
    updateProductCount();
    updateCartItems();
  }, [updateProductCount, updateCartItems]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price || 0), 0);
  };

  const value = {
    cartItems,
    productCount,
    updateCartItems,
    updateProductCount,
    refreshCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
