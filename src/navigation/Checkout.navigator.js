import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CheckoutScreen from "../features/checkout/screens/checkout.screen";
import CheckoutSuccessScreen from "../features/checkout/screens/checkout-success.screen";
import CheckoutErrorScreen from "../features/checkout/screens/checkout-error.screen";

const Stack = createStackNavigator();

const CheckoutNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
    <Stack.Screen name="CheckoutError" component={CheckoutErrorScreen} />
  </Stack.Navigator>
);

export default CheckoutNavigator;
