import React from "react";

import { colors } from "../../../theme/colors";

import SafeArea from "../../../components/utils/SafeArea.component";
import Text from "../../../components/Typography/Text.component";
import { CartIcon, CartIconContainer } from "../checkout.styles";

const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.paramas;

  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};

export default CheckoutErrorScreen;
