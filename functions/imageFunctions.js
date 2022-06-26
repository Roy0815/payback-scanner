import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const albumName = "Payback Scanner";
var album = {};
var imageBuffer = {};

const _saveImage = async (uri) => {
  console.log("before");
  let asset = await MediaLibrary.createAssetAsync(uri);

  if (!album) album = await MediaLibrary.getAlbumAsync(albumName);

  if (!album) {
    album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
  } else {
    await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
  }
};

const _getImageFromDevice = async (name) => {
  //get album
  if (!album.id) album = await MediaLibrary.getAlbumAsync(albumName);

  let result = await MediaLibrary.getAssetsAsync({
    album: await MediaLibrary.getAlbumAsync(albumName),
  });

  //build regex and search
  let regex = new RegExp(`.*\/${albumName}\/${name}\..*`);

  let index = result.assets.findIndex((item) => regex.test(item.uri));

  if (index != -1) {
    //fill buffer and return
    imageBuffer[name] = result.assets[index].uri;
    console.log(result.assets[index].uri);
    return result.assets[index].uri;
  }
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

  console.log(result);

  if (!result.cancelled) {
    let saveResult = await _saveImage(result.uri);
    console.log(saveResult);
  }
};

const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    let saveResult = await _saveImage(result.uri);
    console.log(saveResult);
  }
};

export { takePhoto, pickImage, getImage };
