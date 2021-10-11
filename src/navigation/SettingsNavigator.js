import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../features/restaurants/screens/settings.screen";

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
