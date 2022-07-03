//external imports
import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

//local imports
import {
  formatDate,
  formatTime,
  formatAmount,
} from "../../functions/caseFunctions";
import { caseDetailName } from "../constants";
import { CaseContext } from "../context";

export default function HomeScreen({ navigation, route }) {
  const { listCases } = React.useContext(CaseContext);

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.push(caseDetailName, { case: item })}
    >
      <View style={styles.item}>
        <View style={styles.itemViewInfo}>
          <View style={styles.itemViewHeader}>
            <Text style={styles.itemNameText}>{item.name}</Text>
          </View>
          <View style={styles.itemViewAttributes}>
            <View style={styles.itemViewAttribute}>
              <Text style={styles.itemAttributeLabel}>Date</Text>
              <Text style={styles.itemAttributeText}>
                {formatDate(item.id)}
              </Text>
            </View>
            <View style={styles.itemViewAttribute}>
              <Text style={styles.itemAttributeLabel}>Time</Text>
              <Text style={styles.itemAttributeText}>
                {formatTime(item.id)}
              </Text>
            </View>
            <View style={styles.itemViewAttribute}>
              <Text style={styles.itemAttributeLabel}>Vendor</Text>
              <Text style={styles.itemAttributeText}>
                {item.vendor ? item.vendor : "?"}
              </Text>
            </View>
            <View style={styles.itemViewAttribute}>
              <Text style={styles.itemAttributeLabel}>Amount</Text>
              <Text style={styles.itemAttributeText}>
                {item.amount && item.currency
                  ? `${formatAmount(item.amount)} ${item.currency}`
                  : "?"}
              </Text>
            </View>
          </View>
        </View>
        <Image source={{ uri: item.uri }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listCases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemViewInfo: {
    flex: 1,
  },
  itemViewAttributes: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 5,
  },
  itemViewAttribute: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  homeText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemAttributeLabel: {
    fontWeight: "bold",
    marginVertical: 1,
    width: "40%",
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
