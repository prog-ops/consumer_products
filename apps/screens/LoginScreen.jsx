import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { initializeDatabase } from "../service/DatabaseService";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [busy, setBusy] = useState(false);

  const { login, register } = useContext(AuthContext);

  const goToProducts = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Product" }],
    });
  };

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      Alert.alert("Missing fields", "Please enter username and password.");
      return;
    }

    setBusy(true);
    try {
      await login(trimmedUsername, password);
      goToProducts();
    } catch (error) {
      Alert.alert("Login failed", error?.message || "Invalid username or password");
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      Alert.alert("Missing fields", "Please enter username and password.");
      return;
    }
    if (password.length < 3) {
      Alert.alert("Weak password", "Use at least 3 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Confirm password does not match.");
      return;
    }

    setBusy(true);
    try {
      await register(trimmedUsername, password);
      Alert.alert("Registered", `Account created for ${trimmedUsername}`);
      goToProducts();
    } catch (error) {
      Alert.alert("Register failed", error?.message || "Could not create account");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{isRegisterMode ? "Register" : "Login"}</Text>
        <Text style={styles.hint}>Demo account: U / P</Text>
        <Text style={styles.buildTag}>Build: auth+catalog-v2</Text>
        <Text style={styles.registerHint}>
          Need an account? Tap the green "Register new user" button below.
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        {isRegisterMode ? (
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry
            style={styles.input}
          />
        ) : null}

        {!isRegisterMode ? (
          <Button title={busy ? "Logging in..." : "Login"} onPress={handleLogin} disabled={busy} />
        ) : (
          <Button
            title={busy ? "Creating account..." : "Create account"}
            onPress={handleRegister}
            disabled={busy}
          />
        )}

        <View style={styles.spacer} />

        {!isRegisterMode ? (
          <Pressable
            style={[styles.registerButton, busy && styles.registerButtonDisabled]}
            disabled={busy}
            onPress={() => {
              setIsRegisterMode(true);
              setConfirmPassword("");
            }}
          >
            <Text style={styles.registerButtonText}>Register new user</Text>
          </Pressable>
        ) : (
          <Button
            title="Back to Login"
            onPress={() => {
              setIsRegisterMode(false);
              setConfirmPassword("");
            }}
            disabled={busy}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  card: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  hint: {
    color: "#666",
    marginBottom: 4,
  },
  buildTag: {
    color: "#2e7d32",
    marginBottom: 8,
    fontWeight: "700",
  },
  registerHint: {
    color: "#1565c0",
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  spacer: {
    height: 12,
  },
  registerButton: {
    backgroundColor: "#2e7d32",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
