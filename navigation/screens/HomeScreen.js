import { View, StyleSheet, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={style.home}>
      <Text>Home Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
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
