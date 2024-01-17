import { StyleSheet, Text, View } from "react-native";

export default function SuccessScreen(){
    return(
      <View style={styles.container}>
        <Text>You purchased the product succesfully</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  }
})
