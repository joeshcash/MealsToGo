import React, { useState, useEffect, createContext, useCallback } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("San Francisco");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    onSearch(searchTerm);
  }, [onSearch, searchTerm]);

  const onSearch = useCallback((keyword) => {
    setIsLoading(true);
    setSearchTerm(keyword);

    if (keyword.length) {
      locationRequest(keyword.toLowerCase())
        .then(locationTransform)
        .then((result) => {
          setLocation(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setLocation(null);
          setIsLoading(false);
          setError(err);
        });
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoadingSearch: isLoading,
        errorSearch: error,
        onSearch,
        searchTerm,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
