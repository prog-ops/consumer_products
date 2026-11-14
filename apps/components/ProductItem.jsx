import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { insertProduct } from "../service/DatabaseService";
import { useCartContext } from "../context/CartContext";

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  const { refreshCart } = useCartContext();

  const handleAddToCart = () => {
    insertProduct(product, () => {
      refreshCart();
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          product,
        })
      }
    >
      <Button title="Add to cart" onPress={handleAddToCart} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{`$${product.price}`}</Text>
      <View>
        <Chip>{product.category}</Chip>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    marginTop: 12,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 8,
  },
});

export default ProductItem;
