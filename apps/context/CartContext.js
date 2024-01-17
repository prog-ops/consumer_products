import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductDatabase } from "../service/Database";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [productCount, setProductCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    updateProductCount();
    updateCartItems();
  }, [
    // productCount
  ]);

  const updateProductCount = () => {
    ProductDatabase.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as count FROM products', [], (_, results) => {
        const count = results.rows.item(0).count;
        setProductCount(count);
      });
    });
  };

  const updateCartItems = () => {
    ProductDatabase.transaction((tx) => {
      tx.executeSql('SELECT * FROM products', [], (_, results) => {
        const items = results.rows.raw();
        setCartItems(items);
      });
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const value = {
    cartItems,
    productCount,
    updateCartItems,
    updateProductCount,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
