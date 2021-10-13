import React, { createContext, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState({});

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
  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
