import camelize from "camelize";

import { host, isMock } from "../../utils/env";

export const restaurantRequest = (location) => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res) => res.json()
  );
};

export const restaurantTransform = ({ results = [] }) => {
  const mapResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
      isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
    };
  });

  return camelize(mapResults);
};
