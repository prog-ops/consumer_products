import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { AuthProvider } from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import HomeScreen from "./screens/HomeScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SuccessScreen from "./screens/SuccessScreen";

const Stack = createStackNavigator();

function ShoppingApp() {
    return (
        <AuthProvider>
            <CartProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={({ navigation }) => ({
                                title: 'Home',
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginRight: 16 }}
                                        onPress={() => {
                                            // Handle the press event for the top-right icon
                                        }}
                                    >
                                        <Ionicons name="man-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                ),
                            })}
                        />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="Product" component={ProductScreen} />
                        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                        <Stack.Screen name="Cart" component={CheckoutScreen} />
                        <Stack.Screen name="Success" component={SuccessScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CartProvider>
        </AuthProvider>
    );
}

export default ShoppingApp;
