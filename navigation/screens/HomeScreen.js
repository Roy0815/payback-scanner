import { View, StyleSheet, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={style.home}>
      <Text
        onPress={() => alert("This is the homescreen.")}
        style={style.homeText}
      >
        Home Screen
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeText: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
