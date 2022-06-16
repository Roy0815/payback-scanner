import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera, CameraType } from "expo-camera";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Screen names
const homeName = "Home";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export default class HomeContainer extends React.Component {
  async componentDidMount() {
    await Camera.requestCameraPermissionsAsync();
  }

  render() {
    return (
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
                case settingsName:
                  iconName = focused ? "settings" : "settings-outline";
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={settingsName} component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
