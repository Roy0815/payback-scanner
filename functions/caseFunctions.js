import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const caseKeyPrefix = "CaseKey=";

const getAllCases = async () => {
  let allKeys = await AsyncStorage.getAllKeys();

  if (allKeys.length == 0) return;

  let caseKeyRegex = new RegExp(`^${caseKeyPrefix}.*`);
  let caseKeys = allKeys.filter((key) => caseKeyRegex.test(key));

  if (caseKeys.length == 0) return;

  let casesStr = await AsyncStorage.multiGet(caseKeys);

  let cases = [];

  casesStr.forEach((element) => {
    cases.push(JSON.parse(element[1]));
  });

  return cases;
};

const setCase = async (object) => {
  await AsyncStorage.setItem(caseKeyPrefix + object.id, JSON.stringify(object));
};

const formatDate = (ms) => {
  return Moment(new Date(ms)).format("DD/MM/YYYY");
};

const formatTime = (ms) => {
  return Moment(new Date(ms)).format("HH:mm:ss");
};

const formatAmount = (amount) => {
  return amount
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const sortCases = (caseList) => {
  return caseList.sort((a, b) => b.id - a.id);
};

export {
  getAllCases,
  setCase,
  formatDate,
  formatTime,
  formatAmount,
  sortCases,
};
