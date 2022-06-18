import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera, CameraType } from "expo-camera";
import { ToastProvider } from "react-native-toast-notifications";

// Screens
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Screen names
const homeName = "Home";
const accountName = "Account";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

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
                let routeName = route.name;

                switch (routeName) {
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
            })}
          >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={accountName} component={AccountScreen} />
            <Tab.Screen name={settingsName} component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ToastProvider>
    );
  }
}
