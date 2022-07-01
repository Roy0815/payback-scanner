import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";

//local imports
import { deleteImages, getUnusedImages } from "../../functions/imageFunctions";
import { CaseContext } from "../context";

export default function HomeScreen() {
  const { allCases } = React.useContext(CaseContext);
  const toast = useToast();

  const _deleteImages = () => {
    getUnusedImages(allCases).then((assets) => {
      if (assets.length === 0) {
        toast.show("Nothing to delete");
        return;
      }
      deleteImages(assets).then((res) =>
        toast.show(
          res
            ? `${assets.length} image${assets.length === 1 ? "" : "s"} deleted`
            : `Deletion of ${assets.length} images failed`,
          { type: res ? "success" : "danger" }
        )
      );
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Delete unused images" onPress={_deleteImages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
