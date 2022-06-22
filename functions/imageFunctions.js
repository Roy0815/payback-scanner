import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const albumName = "Payback Scanner";

const _saveImage = async (uri) => {
  let asset = await MediaLibrary.createAssetAsync(uri);

  if (!(await MediaLibrary.getAlbumAsync(albumName))) {
    await MediaLibrary.createAlbumAsync(albumName, asset, false);
  } else {
    await MediaLibrary.addAssetsToAlbumAsync(asset, albumName, false);
  }
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
    console.log(result);
    setImage(saveResult);
  }
};

const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
};

export { takePhoto, pickImage };
