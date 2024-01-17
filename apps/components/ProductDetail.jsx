import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

const ProductDetail = () => {
  const route = useRoute()
  const { product } = route.params

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Column A */}
      <View style={styles.columnA}>
        <View style={styles.columnA1}>
          <Text>{product.price} A1</Text>
        </View>
        <View style={styles.columnA2}>
          <Text>{product.rating.rate} A2</Text>
        </View>
        <View style={styles.columnA3}>
          <Text>{product.rating.count} A3</Text>
        </View>
      </View>

      {/* Column B */}
      <View style={styles.columnB}>
        <Text>{product.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Space between columns
    padding: 10,
  },
  image: {
    width: '100%',
    height: '50%',
    marginBottom: 12,
    resizeMode: 'stretch',
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


export default ProductDetail;
