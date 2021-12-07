import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TAB_ICON } from "../config/constants";

import { colors } from "../theme/colors";

import { RestaurantsContextProvider } from "../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../services/location/location.context";
import { FavouritesContextProvider } from "../services/favourites/favourites.context";
import { CartContextProvider } from "../services/cart/cart.context";

import RestaurantsNavigator from "./Restaurants.navigator";
import SettingsNavigator from "./Settings.navigator";
import CheckoutNavigator from "./Checkout.navigator";

import MapScreen from "../features/map/screens/map.screen";

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
          <CartContextProvider>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: colors.brand.primary,
                inactiveTintColor: colors.brand.muted,
                keyboardHidesTabBar: true,
              }}
            >
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Checkout" component={CheckoutNavigator} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};

export default AppNavigator;
