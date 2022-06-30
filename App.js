import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAllCases, sortCases } from "./functions/caseFunctions";
import HomeContainer from "./navigation/MainContainer";
import { CaseContext, ListContext } from "./navigation/context";

export default function App() {
  //global data
  const [allCases, setAllCases] = React.useState([]);
  const [listCases, setListCases] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [filterSettings, setFilter] = React.useState(false);
  const [sortSettings, setSort] = React.useState(false);

  //local methods
  const _filterCases = () => {
    setListCases(
      filterSettings
        ? allCases
        : allCases.filter((item) => item.id >= 1656281383618)
    );
    setFilter(!filterSettings);
  };

  //contexts
  const caseContext = React.useMemo(() => {
    return {
      sortCases: () => {
        setListCases(sortSettings ? allCases : sortCases(listCases));
        setSort(!sortSettings);
      },
      filterCases: _filterCases,
      addCase: () => {},
      listCases,
    };
  }, [listCases, sortSettings]);

  const listContext = React.useMemo(() => {
    return {
      filterSettings,
      sortSettings,
    };
  }, [filterSettings, sortSettings]);

  // initialize data
  React.useEffect(() => {
    getAllCases().then((res) => {
      setAllCases(res);
      setListCases(allCases);
      setLoading(false);
    });
  }, [isLoading]);

  return (
    <CaseContext.Provider value={caseContext}>
      <ListContext.Provider value={listContext}>
        <HomeContainer allCases={allCases} />
      </ListContext.Provider>
    </CaseContext.Provider>
  );
}

const styles = StyleSheet.create({});
