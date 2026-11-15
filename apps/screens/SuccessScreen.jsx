import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLastProductRoute } from "../service/LastProductRoute";

// Mine: brief success flash, then auto-return to last product screen (no nav buttons)
export default function SuccessScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const lastRoute = getLastProductRoute();

      if (lastRoute?.name === "ProductDetail" && lastRoute.params?.product) {
        navigation.reset({
          index: 1,
          routes: [
            { name: "Product" },
            { name: "ProductDetail", params: lastRoute.params },
          ],
        });
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "Product" }],
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase successful</Text>
      <Text style={styles.subtitle}>Returning to your last product…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
  },
});
