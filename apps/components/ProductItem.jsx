import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { insertProduct } from "../service/DatabaseService";
import { useCartContext } from "../context/CartContext";
// import handleAddToCart from "../service/CartService";

const ProductItem = ({ product }) => {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext);
  const { updateProductCount } = useCartContext();

  const addToCart = () => {
    // handleAddToCart(user.id, product.id);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() =>
      navigation.navigate('ProductDetail', {
        product
      })
    }>
      <Button title='Insert' onPress={() => {
        insertProduct(product);
        updateProductCount()
      }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{'$' + product.price}</Text>
      {/*<Text style={styles.desc}>{product.description}</Text>*/}
      <View>
        {/*<Text>{product.rating.rate} {product.rating.count}</Text>*/}
        <Chip>{product.category}</Chip>
      </View>
      {/* Add other product details as needed */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 8,
  },
  desc: {
    marginTop: 8,
  },
  // Add styles for other product details
});

export default ProductItem;
