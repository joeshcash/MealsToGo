import React from "react";

import { colors } from "../../../theme/colors";

import SafeArea from "../../../components/utils/SafeArea.component";
import Text from "../../../components/Typography/Text.component";
import Spacer from "../../../components/Spacer/Spacer.component";

import { CartIcon, CartIconContainer } from "../checkout.styles";

const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.params;

  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Spacer position="top" size="large" />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};

export default CheckoutErrorScreen;
