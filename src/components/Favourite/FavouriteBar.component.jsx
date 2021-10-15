import React from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";

import Spacer from "../Spacer/Spacer.component";
import Text from "../Typography/Text.component";

import CompactRestaurantInfo from "../../features/restaurants/UICs/CompactRestaurantInfo.uic";

const FavouritesWrapper = styled.View`
  padding: 10px;
`;

const FavouriteBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) return null;

  return (
    <FavouritesWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => (
          <Spacer key={restaurant.name} position="left" size="medium">
            <TouchableOpacity
              onPress={() => onNavigate("RestaurantDetails", { restaurant })}
            >
              <CompactRestaurantInfo restaurant={restaurant} />
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
    </FavouritesWrapper>
  );
};

export default FavouriteBar;
