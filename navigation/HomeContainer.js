import { StyleSheet, Text, View } from "react-native";

export default function HomeContainer() {
  return (
    <View style={styles.main}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
