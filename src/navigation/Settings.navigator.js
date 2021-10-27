import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import SettingsScreen from "../features/settings/screens/settings.screen";
import FavouritesScreen from "../features/settings/screens/favourites.screen";
import CameraScreen from "../features/settings/screens/camera.screen";

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        options={{
          headerTitleAlign: "center",
        }}
        name="Favourites"
        component={FavouritesScreen}
      />
      <SettingsStack.Screen
        options={{
          headerTitleAlign: "center",
        }}
        name="Camera"
        component={CameraScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
