import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { groupByCount } from "../service/DatabaseService";
import { useCartContext } from "../context/CartContext";

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const product = route.params || {};
    const { cartItems, getTotalPrice } = useCartContext();
    const groupedCartItems = groupByCount(cartItems);
    const totalPrice = getTotalPrice();

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22 }}>Cart: {product} product(s)</Text>
            <FlashList
                estimatedItemSize={100}
                data={groupedCartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItemContainer}>
                        <Text style={styles.cartItemTitle}>{item.title}</Text>
                        <Text style={styles.cartItemTitle}>{item.price}</Text>
                        <Text style={styles.cartItemCount}>Quantity: {item.count}</Text>
                    </View>
                )}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                <Text>Checkout? ✔️ Total Price: ${totalPrice.toFixed(2)}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    cartItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 8,
    },
    cartItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cartItemCount: {
        color: "#888",
    },
});
