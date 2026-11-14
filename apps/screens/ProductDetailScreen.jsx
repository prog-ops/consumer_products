import React from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import CartFloatingView from "../components/CartFloatingView";
import { insertProduct } from "../service/DatabaseService";
import { useCartContext } from "../context/CartContext";

const ProductDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params;
  const { refreshCart } = useCartContext();

  const handleAddToCart = () => {
    insertProduct(product, () => {
      refreshCart();
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Button title="Add to cart" onPress={handleAddToCart} />

        <View style={styles.row}>
          <View style={styles.columnA}>
            <Text style={styles.meta}>${product.price}</Text>
            <Text style={styles.meta}>Rating: {product.rating?.rate ?? "-"}</Text>
            <Text style={styles.meta}>Reviews: {product.rating?.count ?? "-"}</Text>
          </View>
          <View style={styles.columnB}>
            <Text>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      <CartFloatingView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 260,
    marginBottom: 12,
    resizeMode: "contain",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  columnA: {
    marginRight: 12,
  },
  meta: {
    marginBottom: 8,
    fontWeight: "600",
  },
  columnB: {
    flex: 1,
  },
});

export default ProductDetailScreen;
