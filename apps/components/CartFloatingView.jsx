import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useCartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const CartFloatingView = () => {
  const navigation = useNavigation();
  // const [productCount, setProductCount] = useState(0);
  const { productCount } = useCartContext();

  /*useEffect(() => {
    updateProductCount();
  }, []);

  const updateProductCount = () => {
    ProductDatabase.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as count FROM products', [], (_, results) => {
        const count = results.rows.item(0).count;
        setProductCount(count);
      });
    });
  };*/

  return (
    <TouchableOpacity
      style={styles.floatingView}
      onPress={() => navigation.navigate('Cart', productCount)}
    >
      <View style={styles.floatingContent}>
        {/*<Image
          source={require('path/to/your/cart-icon.png')}
          style={styles.cartIcon}
        />*/}
        <Text style={styles.cartCount}>{productCount} product(s) in cart</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingView: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  floatingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  cartCount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartFloatingView;
