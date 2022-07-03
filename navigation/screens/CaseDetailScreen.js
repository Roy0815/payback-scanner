import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import ImageModal from "react-native-image-modal";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "react-native-toast-notifications";

//local imports
import {
  takePhoto,
  pickImage,
  getImage,
  submitToGoogle,
} from "../../functions/imageFunctions";
import { CaseContext } from "../context";

export default function HomeScreen({ route }) {
  const [image, setImage] = React.useState(route.params.case.uri);
  const [text, setText] = React.useState("Not analyzed by Google yet");
  const { updateCase } = React.useContext(CaseContext);
  const toast = useToast();

  const _saveImageToCase = async (imageName) => {
    let uri = await getImage(imageName);
    setImage(uri);

    let caseObj = route.params.case;
    caseObj.uri = uri;
    updateCase(caseObj);
  };

  const _pickImage = () => {
    pickImage().then((name) => {
      if (name) _saveImageToCase(name);
    });
  };

  const _takePhoto = () => {
    takePhoto().then((name) => {
      if (name) _saveImageToCase(name);
    });
  };

  const _uploadImage = async () => {
    let uploadToast = toast.show("Uploading...");
    setText(await submitToGoogle(image));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
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
          <MatIcons.Button name="upload" onPress={_uploadImage}>
            Upload
          </MatIcons.Button>
        </View>
      </View>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: 210,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  buttonView: {
    margin: 3,
    marginTop: 5,
    height: 200,
    justifyContent: "space-evenly",
  },
  image: {
    margin: 3,
    marginTop: 5,
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
});
