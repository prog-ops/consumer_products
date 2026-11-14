import { StyleSheet, Text, View } from "react-native";

// Kept for route compatibility. App now opens Products after login.
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecting to products is handled after login.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "#666",
  },
});
