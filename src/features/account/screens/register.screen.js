import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import Spacer from "../../../components/Spacer/Spacer.component";
import Text from "../../../components/Typography/Text.component";

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../account.styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { onRegister, error, isLoading, setError } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    if (error) setError(null);
  }, []);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />

        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>

        <Spacer size="large">
          <AuthInput
            label="Confirm password"
            value={confirmPassword}
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </Spacer>

        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}

        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, confirmPassword)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};

export default RegisterScreen;
