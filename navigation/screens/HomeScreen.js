import { View, StyleSheet, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.home}>
      <Text>Home Screen</Text>
      <Button
        title="To Case Details"
        onPress={() => navigation.push("Case Details")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
