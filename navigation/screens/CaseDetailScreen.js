import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
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
  const [fullText, setFullText] = React.useState(
    route.params.case.text || "Not analyzed by Google yet"
  );
  const { updateCase } = React.useContext(CaseContext);
  const toast = useToast();

  const _updateCase = async ({ imageName, text }) => {
    let caseObj = route.params.case;
    //image
    if (imageName) {
      let uri = await getImage(imageName);
      setImage(uri);
      caseObj.uri = uri;
    }

    //text
    if (text) {
      setFullText(text);
      caseObj.text = text;
    }

    //update
    updateCase(caseObj);
  };

  const _pickImage = () => {
    pickImage().then((name) => {
      if (name) _updateCase({ imageName: name });
    });
  };

  const _takePhoto = () => {
    takePhoto().then((name) => {
      if (name) _updateCase({ imageName: name });
    });
  };

  const _uploadImage = async () => {
    let uploadToastId = toast.show("Uploading...");
    submitToGoogle(image).then((res) => {
      toast.hide(uploadToastId);
      toast.show("Upload completed", { type: "success" });
      _updateCase({ text: res });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageModal
          style={styles.image}
          source={{ uri: image }}
          imageBackgroundColor="transparent"
          resizeMode="center"
          modalImageResizeMode="cover"
          overlayBackgroundColor="transparent"
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
      <View style={styles.attributesContainer}>
        <Text style={styles.titleText}>Titel</Text>
        <View style={styles.attributeView}>
          <Text style={styles.attributeLabel}>Label</Text>
          <Text style={styles.attributeText}>Text</Text>
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.attributeLabel}>Label</Text>
          <Text style={styles.attributeText}>Text</Text>
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.attributeLabel}>Label</Text>
          <Text style={styles.attributeText}>Text</Text>
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.attributeLabel}>Label</Text>
          <Text style={styles.attributeText}>Text</Text>
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.attributeLabel}>Label</Text>
          <Text style={styles.attributeText}>Text</Text>
        </View>
        {/* <Text>{fullText}</Text> */}
      </View>
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
    backgroundColor: "transparent",
  },
  attributesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    width: "100%",
  },
  buttonView: {
    margin: 3,
    marginTop: 5,
    height: 200,
    justifyContent: "space-evenly",
  },
  attributeView: {
    flexDirection: "row",
    // alignSelf: "flex-start",
    marginTop: 10,
    width: "90%",
  },
  image: {
    margin: 3,
    marginTop: 5,
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 40,
    alignContent: "center",
  },
  attributeLabel: {
    fontWeight: "bold",
    marginVertical: 1,
    width: "30%",
    fontSize: 20,
  },
  attributeText: {
    marginVertical: 1,
    fontSize: 20,
  },
});
