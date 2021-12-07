import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState({});

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user && user.uid) loadFavourites(user.uid);
  }, [user]);

  useEffect(() => {
    if (user && user.uid) saveFavourites(favourites, user.uid);
  }, [favourites, user]);

  const add = (restaurant) => {
    setFavourites({ ...favourites, [restaurant.placeId]: restaurant });
  };

  const remove = (restaurant) => {
    if (favourites[restaurant.placeId]) {
      const newFavourites = { ...favourites };

      delete newFavourites[restaurant.placeId];

      setFavourites(newFavourites);
    }
  };

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.error("error storing", e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
      const loadedFavourites = jsonValue != null ? JSON.parse(jsonValue) : {};
      setFavourites(loadedFavourites);
    } catch (e) {
      console.error("error loading", e);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
