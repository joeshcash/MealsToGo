import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState({});

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

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

  const saveFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.error("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favourites");
      const loadedFavourites = jsonValue != null ? JSON.parse(jsonValue) : null;
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
