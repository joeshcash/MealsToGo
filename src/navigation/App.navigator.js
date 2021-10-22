import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TAB_ICON } from "../config/constants";

import { RestaurantsContextProvider } from "../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../services/location/location.context";
import { FavouritesContextProvider } from "../services/favourites/favourites.context";

import RestaurantsNavigator from "./Restaurants.navigator";
import MapNavigator from "./Map.navigator";
import SettingsNavigator from "./Settings.navigator";

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

const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
              keyboardHidesTabBar: true,
            }}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapNavigator} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};

export default AppNavigator;
