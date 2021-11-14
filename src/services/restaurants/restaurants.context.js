import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";

import { restaurantRequest, restaurantTransform } from "./restaurants.service";

import { LocationContext } from "../location/location.context";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const { location } = useContext(LocationContext);

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveRestaurants = useCallback((locationString) => {
    setRestaurants([]);

    restaurantRequest(locationString)
      .then(restaurantTransform)
      .then((results) => {
        setRestaurants(results);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        noResults();
        setError(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    } else {
      noResults();
    }
  }, [location, retrieveRestaurants]);

  const noResults = () => {
    setIsLoading(false);
    setRestaurants([]);
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
