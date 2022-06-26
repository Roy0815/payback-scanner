import Moment from "moment";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getImage } from "./imageFunctions";

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

  // const date = new Date();
  // const cases2 = [
  //   { id: date.getTime(), name: "Aral 53,23€", uri: await getImage("Abc") },
  //   { id: date.getTime() + 1, name: "2", uri: await getImage("Def") },
  //   { id: date.getTime() + 2, name: "3", uri: await getImage("Ghi") },
  //   { id: date.getTime() + 3, name: "4", uri: await getImage("Abc") },
  //   { id: date.getTime() + 4, name: "5", uri: await getImage("Abc") },
  //   { id: date.getTime() + 5, name: "6", uri: await getImage("Abc") },
  //   { id: date.getTime() + 6, name: "7", uri: await getImage("Abc") },
  //   { id: date.getTime() + 7, name: "8", uri: await getImage("Abc") },
  //   { id: date.getTime() + 8, name: "9", uri: await getImage("Abc") },
  //   { id: date.getTime() + 9, name: "10", uri: await getImage("Abc") },
  //   { id: date.getTime() + 10, name: "11", uri: await getImage("Abc") },
  // ];

  // return cases2;
};

const setCase = async (object) => {
  await AsyncStorage.setItem(caseKeyPrefix + object.id, JSON.stringify(object));
};

const formatDate = (ms) => {
  return Moment(new Date(ms)).format("DD/MM/YYYY, HH:mm:ss");
};

export { getAllCases, setCase, formatDate };
