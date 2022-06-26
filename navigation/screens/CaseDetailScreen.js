import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";

import { takePhoto, pickImage } from "../../functions/imageFunctions";

export default function HomeScreen({ navigation, route }) {
  const [image, setImage] = useState(route.params.case.uri);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a picture" onPress={takePhoto} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
