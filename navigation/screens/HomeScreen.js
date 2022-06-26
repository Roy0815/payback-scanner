import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { getCases, formatDate } from "../../functions/caseFunctions";

export default function HomeScreen({ navigation }) {
  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.push("Case Details", { case: item })}
    >
      <View style={styles.item}>
        <View style={styles.itemViewInfo}>
          <View style={styles.itemViewHeader}>
            <Text style={styles.itemNameText}>{item.name}</Text>
            {/* <Ionicons name="home" /> */}
          </View>
          <View style={styles.itemViewAttributes}>
            <Text style={styles.itemAttributeText}>{formatDate(item.id)}</Text>
            <Text style={styles.itemAttributeText}>{formatDate(item.id)}</Text>
          </View>
        </View>
        <Image source={{ uri: item.uri }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item item={item} />;
  const [allCases, setAllCases] = useState([]);

  const setCasesAsync = async () => {
    if (allCases.length == 0) setAllCases(await getCases());
  };

  useEffect(() => {
    setCasesAsync();
  }, [allCases]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allCases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3, //StatusBar.currentHeight || 0,
  },
  home: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  homeV: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "grey",
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  itemViewHeader: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemViewInfo: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  itemViewAttributes: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  homeText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemAttributeText: {
    marginVertical: 1,
  },
  image: {
    borderRadius: 10,
    width: 100,
    height: 150,
  },
});
