import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import CartFloatingView from "../components/CartFloatingView";
import { insertProduct } from "../service/DatabaseService";
import { useCartContext } from "../context/CartContext";

const ProductDetailScreen = () => {
  const route = useRoute()
  const { product } = route.params
  const { updateProductCount } = useCartContext();

  return (
    <View style={styles.container}>
      <View style={styles.largeImageContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Button title='Insert' onPress={() => {
          insertProduct(product);
          updateProductCount()
        }} />
      </View>

      <View style={styles.row}>
        {/* Column A */}
        <View style={styles.columnA}>
          <View style={styles.columnA1}>
            <Text>Rp. {product.price}</Text>
          </View>
          <View style={styles.columnA2}>
            <Text>{product.rating.rate}</Text>
          </View>
          <View style={styles.columnA3}>
            <Text>{product.rating.count}</Text>
          </View>
        </View>

        {/* Column B */}
        <View style={styles.columnB}>
          <Text>{product.description}</Text>
        </View>
      </View>

      <CartFloatingView/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  largeImageContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Space between columns
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",

  },
  image: {
    width: '100%',
    height: '80%',
    marginBottom: 12,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  columnA: {
    flexDirection: 'column', // Arrange children in a column
  },
  columnA1: {
    width: 'auto', // Width will adjust based on content
    marginBottom: 10,
  },
  columnA2: {
    width: 'auto', // Width will adjust based on content
    marginBottom: 10,
  },
  columnA3: {
    width: 'auto', // Width will adjust based on content
  },
  columnB: {
    flex: 1, // Takes up remaining space
    marginLeft: 10, // Add some space between columns
  },
});


export default ProductDetailScreen;
