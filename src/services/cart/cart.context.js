import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (user && user.uid) loadCart(user.uid);
  }, [user]);

  useEffect(() => {
    if (user && user.uid) saveCart(restaurant, cart, user.uid);
  }, [restaurant, cart, user]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
    } else {
      setSum(cart.reduce((acc, { price }) => (acc += price), 0));
    }
  }, [cart]);

  const add = (item, resto) => {
    if (!restaurant || restaurant.placeId !== resto.placeId) {
      setRestaurant(resto);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  const saveCart = async (currentResto, currentCart, uid) => {
    try {
      const jsonValue = JSON.stringify({
        restaurant: currentResto,
        cart: currentCart,
      });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.error("error storing", e);
    }
  };

  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);

      if (value !== null) {
        const { restaurant: currentResto, cart: currentCart } =
          JSON.parse(value);

        setRestaurant(currentResto);
        setCart(currentCart);
      }
    } catch (e) {
      console.error("error loading", e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
