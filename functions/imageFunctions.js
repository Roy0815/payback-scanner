import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

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

export { takePhoto, pickImage, getImage, getUnusedImages, deleteImages };
