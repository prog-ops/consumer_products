import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { groupByCount } from "../service/DatabaseService";
import { useCartContext } from "../context/CartContext";

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cartItems, productCount, getTotalPrice, refreshCart, clearCart } =
    useCartContext();
  const groupedCartItems = groupByCount(cartItems);
  const totalPrice = getTotalPrice();
  const [checkingOut, setCheckingOut] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshCart();
    }, [refreshCart]),
  );

  // Mine: clear cart then show Success (auto-returns to last product)
  const handleCheckout = async () => {
    if (groupedCartItems.length === 0 || checkingOut) {
      return;
    }
    setCheckingOut(true);
    try {
      await clearCart();
      navigation.navigate("Success");
    } catch (error) {
      console.error("Checkout failed", error);
      setCheckingOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart: {productCount} product(s)</Text>

      {groupedCartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No products in cart yet.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Product")}>
            <Text style={styles.linkText}>Browse products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlashList
          data={groupedCartItems}
          keyExtractor={(item) => `${item.title}-${item.price}`}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.cartItemContainer}>
              <Text style={styles.cartItemTitle}>{item.title}</Text>
              <Text style={styles.cartItemPrice}>${Number(item.price).toFixed(2)}</Text>
              <Text style={styles.cartItemCount}>Quantity: {item.count}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          (groupedCartItems.length === 0 || checkingOut) && styles.checkoutButtonDisabled,
        ]}
        onPress={handleCheckout}
        disabled={groupedCartItems.length === 0 || checkingOut}
      >
        <Text style={styles.checkoutText}>
          {checkingOut
            ? "Processing…"
            : `Checkout  Total: $${totalPrice.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  cartItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 15,
    color: "#2e7d32",
    marginTop: 4,
  },
  cartItemCount: {
    color: "#888",
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#666",
    marginBottom: 12,
  },
  linkText: {
    color: "#1565c0",
    fontWeight: "600",
  },
  checkoutButton: {
    marginTop: 12,
    backgroundColor: "#1565c0",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
