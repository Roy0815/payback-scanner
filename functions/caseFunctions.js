import Moment from "moment";

import { getImage } from "./imageFunctions";

const getCases = async () => {
  const date = new Date();
  const cases = [
    { id: date.getTime(), name: "Aral 53,23€", uri: await getImage("Abc") },
    { id: date.getTime() + 1, name: "2", uri: await getImage("Def") },
    { id: date.getTime() + 2, name: "3", uri: await getImage("Ghi") },
    { id: date.getTime() + 3, name: "4", uri: await getImage("Abc") },
    { id: date.getTime() + 4, name: "5", uri: await getImage("Abc") },
    { id: date.getTime() + 5, name: "6", uri: await getImage("Abc") },
    { id: date.getTime() + 6, name: "7", uri: await getImage("Abc") },
    { id: date.getTime() + 7, name: "8", uri: await getImage("Abc") },
    { id: date.getTime() + 8, name: "9", uri: await getImage("Abc") },
    { id: date.getTime() + 9, name: "10", uri: await getImage("Abc") },
    { id: date.getTime() + 10, name: "11", uri: await getImage("Abc") },
  ];

  return cases;
};

const formatDate = (ms) => {
  return Moment(new Date(ms)).format("DD/MM/YYYY, HH:mm:ss");
};

export { getCases, formatDate };
