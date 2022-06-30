import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ToastProvider } from "react-native-toast-notifications";

import {
  // Screens
  HomeScreen,
  AccountScreen,
  SettingsScreen,
  CaseDetailScreen,
} from "./screens";

// Screen names
import {
  homeName,
  caseDetailName,
  accountName,
  settingsName,
} from "./constants";
import { CaseContext, ListContext } from "./context";

// Navigation objects
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// local functions
const _addCase = () => {
  // setCase({
  //   id: new Date().getTime(),
  //   name: "Aral 20,23€",
  //   uri: "file:///storage/emulated/0/Pictures/Payback Scanner/Abc.jpg",
  // });
};

const _showHeader = (route) => {
  switch (route) {
    case homeName:
      return false;
    default:
      return true;
  }
};

// Stack Wrapper
const HomeStackScreen = ({ route }) => {
  const { filterCases, sortCases } = React.useContext(CaseContext);
  const { filterSettings, sortSettings } = React.useContext(ListContext);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={homeName}
        component={HomeScreen}
        // initialParams={{ listCases: allCases }}
        options={{
          headerRight: () => (
            <View style={styles.headerButtonView}>
              <MatIcons.Button
                onPress={sortCases}
                backgroundColor="white"
                iconStyle={styles.headerButton}
                size={22}
                name={sortSettings ? "sort-ascending" : "sort-variant"}
              />
              <MatIcons.Button
                onPress={() => filterCases()}
                backgroundColor="white"
                iconStyle={styles.headerButton}
                size={21}
                name={
                  filterSettings ? "filter-check-outline" : "filter-outline"
                }
              />
              <MatIcons.Button
                onPress={_addCase}
                backgroundColor="white"
                iconStyle={styles.headerButton}
                size={22}
                name="plus"
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name={caseDetailName}
        component={CaseDetailScreen}
        options={({ route }) => ({ title: route.params.case.name })}
      />
    </HomeStack.Navigator>
  );
};

export default function HomeContainer({ allCases }) {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case homeName:
                  iconName = focused ? "home" : "home-outline";
                  break;
                case accountName:
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
                  break;
                case settingsName:
                  iconName = focused ? "settings" : "settings-outline";
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: _showHeader(route.name),
          })}
        >
          <Tab.Screen name={homeName} component={HomeStackScreen} />
          <Tab.Screen name={accountName} component={AccountScreen} />
          <Tab.Screen name={settingsName} component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    color: "black",
  },
  headerButtonView: {
    flexDirection: "row",
  },
});
