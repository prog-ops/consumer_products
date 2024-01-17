import { Button, SafeAreaView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { AnimatedFlashList } from "@shopify/flash-list";
import ProductItem from "../components/ProductItem";
import { getProducts, insertProduct } from "../service/DatabaseService";
import CartFloatingView from "../components/CartFloatingView";

export default function ProductScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setData(data));
  }, [data]);

  //✔️
  /*useEffect(() => {
    getProducts((products) => {
      products.map(item => {
        console.log('All products:', item.title);
      })
    });
  }, []);*/

  return (
    <View style={{ height: '100%' }}>
      <Text>Product screen {data.length}</Text>
      <AnimatedFlashList
        estimatedItemSize={100}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductItem product={item} /> }
      />
      <CartFloatingView/>
      {/*{data.map((item, index) => (
        <View key={index}>
          <Text>{item.title}</Text>
        </View>
      ))}*/}
    </View>
  );
}
