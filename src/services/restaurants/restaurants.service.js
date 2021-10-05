import camelize from "camelize";

import { mocks, mockImages } from "./mock";

export const restaurantRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];

    if (!mock) reject("Not found");

    resolve(camelize(mock));
  });
};

export const restaurantTransform = ({ results = [] }) => {
  const mapResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPORARILY",
      isOpenNow: restaurant.openingHours && restaurant.openingHours.openNow,
    };
  });

  return mapResults;
};
