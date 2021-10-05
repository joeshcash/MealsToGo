import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TAB_ICON } from "../config/constants";

import RestaurantScreen from "../features/restaurants/screens/restaurants.screen";
import SettingsScreen from "../features/restaurants/screens/settings.screen";
import MapScreen from "../features/restaurants/screens/map.screen";

const Tab = createBottomTabNavigator();

const tabBarIcon =
  (iconName) =>
  ({ color, size }) =>
    <Ionicons name={iconName} size={size} color={color} />;

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: tabBarIcon(iconName),
  };
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Restaurants" component={RestaurantScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;
