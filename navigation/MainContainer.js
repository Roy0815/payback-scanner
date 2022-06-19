import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera, CameraType } from "expo-camera";
import { ToastProvider } from "react-native-toast-notifications";

// Screens
import {
  HomeScreen,
  AccountScreen,
  SettingsScreen,
  CaseDetailScreen,
} from "./screens";

// Screen names
const homeName = "Home";
const caseDetailName = "Case Details";
const accountName = "Account";
const settingsName = "Settings";

// Navigation objects
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// Stack Wrapper
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name={homeName} component={HomeScreen} />
    <HomeStack.Screen name={caseDetailName} component={CaseDetailScreen} />
  </HomeStack.Navigator>
);

// Functions
const showHeader = (route) => {
  switch (route) {
    case homeName:
      return false;
    default:
      return true;
  }
};

export default class HomeContainer extends React.Component {
  async componentDidMount() {
    await Camera.requestCameraPermissionsAsync();
  }

  render() {
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
              headerShown: showHeader(route.name),
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
}
