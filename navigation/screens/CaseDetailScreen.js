import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  const [image, setImage] = useState(null);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={() => {}} />
      <Button title="Take a picture" onPress={() => {}} />
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
