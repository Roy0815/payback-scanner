import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import { API_KEY } from "@env";

const albumName = "Payback Scanner";
var album;
var imageBuffer = [];

const _saveImage = async (uri) => {
  let asset = await MediaLibrary.createAssetAsync(uri);

  if (!album) album = await MediaLibrary.getAlbumAsync(albumName);

  if (!album) {
    album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
  } else {
    await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
  }

  return asset.filename;
};

const _getImagesFromAlbum = async () => {
  //get album
  if (!album || !album.id) album = await MediaLibrary.getAlbumAsync(albumName);

  let result = await MediaLibrary.getAssetsAsync({
    album: await MediaLibrary.getAlbumAsync(albumName),
  });

  return result.assets;
};

const _getImageFromDevice = async (name) => {
  let assets = await _getImagesFromAlbum();

  //build regex and search
  // path = "*/Album/*.*"
  let regex = new RegExp(`.*\/${albumName}\/${name.split(".")[0]}\..*`);

  let index = assets.findIndex((item) => regex.test(item.uri));

  if (index != -1) {
    //fill buffer and return
    imageBuffer[name] = assets[index].uri;
    return assets[index].uri;
  }
};

_getImageBase64 = async (uri) => {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

const getImage = async (name) => {
  //try from buffer
  if (imageBuffer[name]) return imageBuffer[name];

  //get from device
  return _getImageFromDevice(name);
};

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.cancelled) {
    //name
    return await _saveImage(result.uri);
  }
};

const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.cancelled) {
    //name
    return await _saveImage(result.uri);
  }
};

const getUnusedImages = async (allCases) => {
  let unusedAssets = [];
  let assets = await _getImagesFromAlbum();

  //check all pictures in album
  assets.forEach((asset) => {
    //if not used in any case
    if (-1 === allCases.findIndex((item) => item.uri === asset.uri)) {
      unusedAssets.push(asset);
    }
  });

  return unusedAssets;
};

const deleteImages = async (assets) => {
  return await MediaLibrary.deleteAssetsAsync(assets);
};

const submitToGoogle = async (image) => {
  // let base64 = await _getImageBase64(image);
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
          image: {
            content: await _getImageBase64(image),
          },
        },
      ],
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );
    console.log(`Google call:`);
    let resJson = await response.json();
    return resJson.responses[0].fullTextAnnotation.text;
    // console.log(response);
  } catch (error) {
    console.log("Error");
    console.log(error);
    return error;
  }
};

export {
  takePhoto,
  pickImage,
  getImage,
  getUnusedImages,
  deleteImages,
  submitToGoogle,
};
