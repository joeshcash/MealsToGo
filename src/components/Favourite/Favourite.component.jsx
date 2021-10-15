import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../services/favourites/favourites.context";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

const Favourite = ({ item }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = (restaurant) => !!favourites[restaurant.placeId];

  const handleFavourite = (restaurant, isLike) => {
    if (isLike) {
      removeFromFavourites(restaurant);
    } else {
      addToFavourites(restaurant);
    }
  };

  const isLike = isFavourite(item);

  return (
    <FavouriteButton onPress={() => handleFavourite(item, isLike)}>
      <AntDesign
        name={isLike ? "heart" : "hearto"}
        size={25}
        color={isLike ? "red" : "white"}
      />
    </FavouriteButton>
  );
};

export default Favourite;
