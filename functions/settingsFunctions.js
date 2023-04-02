import AsyncStorage from "@react-native-async-storage/async-storage";

const DateFormatKey = "DateFormat";
const defaultDateFormat = "DD.MM.YYYY";

var bufferDateFormat;

const setDateFormat = (format) => {
  AsyncStorage.setItem(DateFormatKey, format);
};

const getDateFormat = () => {
  AsyncStorage.getItem(DateFormatKey).then((res) => (bufferDateFormat = res));
  return bufferDateFormat || defaultDateFormat;
  // return (await AsyncStorage.getItem(DateFormatKey)) || defaultDateFormat;
};

export { setDateFormat, getDateFormat };
