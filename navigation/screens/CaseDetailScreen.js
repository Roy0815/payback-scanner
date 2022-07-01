import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import ImageModal from "react-native-image-modal";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";

//local imports
import { takePhoto, pickImage, getImage } from "../../functions/imageFunctions";
import { CaseContext } from "../context";

export default function HomeScreen({ route }) {
  const [image, setImage] = React.useState(route.params.case.uri);
  const { updateCase } = React.useContext(CaseContext);

  const _saveImageToCase = async (imageName) => {
    let uri = await getImage(imageName);
    setImage(uri);

    let caseObj = route.params.case;
    caseObj.uri = uri;
    updateCase(caseObj);
  };

  const _pickImage = () => {
    pickImage().then((name) => {
      _saveImageToCase(name);
    });
  };

  const _takePhoto = () => {
    takePhoto().then((name) => {
      _saveImageToCase(name);
    });
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a picture" onPress={takePhoto} /> */}
      <ImageModal
        style={styles.image}
        source={{ uri: image }}
        imageBackgroundColor="transparent"
        resizeMode="cover"
      />
      <View style={styles.buttonView}>
        <MatIcons.Button name="camera-outline" onPress={_takePhoto}>
          Take new picture
        </MatIcons.Button>
        <MatIcons.Button name="folder-image" onPress={_pickImage}>
          Pick picture
        </MatIcons.Button>
        <MatIcons.Button name="upload" onPress={pickImage}>
          Upload
        </MatIcons.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  buttonView: {
    marginTop: 3,
    height: 200,
    justifyContent: "space-evenly",
  },
  image: {
    marginTop: 3,
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});
