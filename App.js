import { StyleSheet, Text, View } from "react-native";
import HomeContainer from "./navigation/MainContainer";

export default function App() {
  return <HomeContainer />;
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
