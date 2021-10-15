import React from "react";

import CompactRestaurantInfo from "../../restaurants/UICs/CompactRestaurantInfo.uic";

const MapCallout = ({ restaurant }) => {
  return <CompactRestaurantInfo isMap restaurant={restaurant} />;
};

export default MapCallout;
