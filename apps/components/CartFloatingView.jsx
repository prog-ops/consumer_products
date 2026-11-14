import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const CartFloatingView = () => {
  const navigation = useNavigation();
  const { productCount, refreshCart } = useCartContext();
  const badgeLabel = productCount > 99 ? "99+" : String(productCount);

  return (
    <TouchableOpacity
      style={styles.floatingView}
      onPress={() => {
        refreshCart();
        navigation.navigate("Cart");
      }}
      accessibilityRole="button"
      accessibilityLabel={`Cart, ${productCount} items`}
    >
      <Ionicons name="cart" size={28} color="#fff" />
      {productCount > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeLabel}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingView: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e53935",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});

export default CartFloatingView;
