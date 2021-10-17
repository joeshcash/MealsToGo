import React, { useContext } from "react";
import { View, Text, Button } from "react-native";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const SettingsScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button title="Logout" onPress={() => onLogout()} />
    </View>
  );
};

export default SettingsScreen;
