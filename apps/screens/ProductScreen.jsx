import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import ProductItem from "../components/ProductItem";
import CartFloatingView from "../components/CartFloatingView";
import { FALLBACK_PRODUCTS, fetchProducts } from "../service/ProductApi";

export default function ProductScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      const result = await fetchProducts({ minCount: 120 });
      setData(result.products);
      setUsingFallback((result.source || "").includes("generated") && (result.source || "") === "generated");
      setError(null);
    } catch (err) {
      const message =
        err?.name === "AbortError"
          ? "Request timed out. Emulator DNS/network may be blocked."
          : err?.message || "Network request failed";

      // Keep the app usable when the emulator cannot reach the internet.
      setData(FALLBACK_PRODUCTS);
      setUsingFallback(true);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products ({data.length}) · catalog-v2</Text>
      {usingFallback ? (
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Offline demo data</Text>
          <Text style={styles.bannerText}>
            Live API failed: {error}. Showing sample products. Fix emulator DNS,
            then tap Retry.
          </Text>
          <Button title="Retry live API" onPress={loadProducts} />
        </View>
      ) : null}
      <FlashList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
        contentContainerStyle={styles.listContent}
      />
      <CartFloatingView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  banner: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF3E0",
    borderWidth: 1,
    borderColor: "#FFB74D",
  },
  bannerTitle: {
    fontWeight: "700",
    marginBottom: 4,
    color: "#E65100",
  },
  bannerText: {
    color: "#5D4037",
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 80,
  },
  statusText: {
    marginTop: 8,
    color: "#555",
    textAlign: "center",
  },
});
