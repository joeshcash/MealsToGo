import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../features/map/screens/map.screen";

const MapStack = createStackNavigator();

const MapNavigator = () => {
  return (
    <MapStack.Navigator headerMode="none">
      <MapStack.Screen name="Map" component={MapScreen} />
    </MapStack.Navigator>
  );
};

export default MapNavigator;
