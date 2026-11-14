import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import HomeScreen from "./screens/HomeScreen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SuccessScreen from "./screens/SuccessScreen";
import { useContext } from "react";

const Stack = createStackNavigator();

function ProductHeaderRight({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.headerActions}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-circle-outline" size={26} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

function ShoppingApp() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="Product"
                component={ProductScreen}
                options={({ navigation }) => ({
                  title: "Products",
                  headerBackVisible: false,
                  gestureEnabled: false,
                  headerLeft: () => null,
                  headerRight: () => (
                    <ProductHeaderRight navigation={navigation} />
                  ),
                })}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: "Product Detail" }}
              />
              <Stack.Screen
                name="Cart"
                component={CheckoutScreen}
                options={{ title: "Cart" }}
              />
              <Stack.Screen name="Success" component={SuccessScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  headerButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default ShoppingApp;
