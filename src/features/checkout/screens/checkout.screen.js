import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { payRequest } from "../../../services/checkout/checkout.service";

import { CartContext } from "../../../services/cart/cart.context";

import SafeArea from "../../../components/utils/SafeArea.component";
import Text from "../../../components/Typography/Text.component";
import Spacer from "../../../components/Spacer/Spacer.component";

import CreditCardInput from "../components/CreditCard.component";
import RestaurantInfoCard from "../../restaurants/UICs/RestaurantInfoCard/RestaurantInfoCard.uic";

import {
  CartIcon,
  CartIconContainer,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "../checkout.styles";

const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    if (!card || !card.id) {
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });

      return;
    }

    setIsLoading(true);

    payRequest(card.id, sum, name)
      .then(() => {
        setIsLoading(false);
        clearCart();

        navigation.navigate("CheckoutSuccess");
      })
      .catch((err) => {
        setIsLoading(false);

        navigation.navigate("CheckoutError", {
          error: err,
        });
      });
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }, idx) => (
              <List.Item key={idx} title={`${item} - ${price / 100}`} />
            ))}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            setName(t);
          }}
        />

        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() => {
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your credit card",
                });
              }}
            />
          )}
        </Spacer>
        <Spacer position="top" size="large" />
        <PayButton disabled={isLoading} icon="cash-usd" onPress={onPay}>
          Pay
        </PayButton>
        <Spacer position="top" size="large" />
        <ClearButton disabled={isLoading} icon="cart-off" onPress={clearCart}>
          Clear cart
        </ClearButton>
        <Spacer position="top" size="large" />
      </ScrollView>
    </SafeArea>
  );
};

export default CheckoutScreen;
