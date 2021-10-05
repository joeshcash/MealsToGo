import React, { useState, createContext, useEffect, useContext } from "react";

import { restaurantRequest, restaurantTransform } from "./restaurants.service";

import { LocationContext } from "../location/location.context";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const { location } = useContext(LocationContext);

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      if (location) {
        const locationString = `${location.lat},${location.lng}`;
        retrieveRestaurants(locationString);
      } else {
        retrieveRestaurants(location);
      }
    }, 2000);
  }, [location]);

  const retrieveRestaurants = (locationString) => {
    setRestaurants([]);

    restaurantRequest(locationString)
      .then(restaurantTransform)
      .then((results) => {
        setRestaurants(results);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRestaurants([]);
        setError(err);
      });
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
