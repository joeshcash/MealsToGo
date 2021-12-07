import React from "react";

import SafeArea from "../../../components/utils/SafeArea.component";
import Text from "../../../components/Typography/Text.component";
import Spacer from "../../../components/Spacer/Spacer.component";

import { CartIcon, CartIconContainer } from "../checkout.styles";

const CheckoutSuccessScreen = () => (
  <SafeArea>
    <CartIconContainer>
      <CartIcon icon="check-bold" />
      <Spacer position="top" size="large" />
      <Text variant="label">Success!</Text>
    </CartIconContainer>
  </SafeArea>
);

export default CheckoutSuccessScreen;
