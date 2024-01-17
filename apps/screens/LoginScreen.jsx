import { Button, SafeAreaView, TextInput, View } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
// import { createTable } from "../service/CartService";
import { initializeDatabase } from "../service/DatabaseService";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (username === "U" && password === "P") {
      login(username, password);
      navigation.navigate("Home");
    } else {
      console.log("Wrong authentication!");
    }
  };

  useEffect(() => {
    // createTable();
    initializeDatabase();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
