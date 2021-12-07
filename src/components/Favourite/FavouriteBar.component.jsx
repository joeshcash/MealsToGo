import React from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import Spacer from "../Spacer/Spacer.component";
import Text from "../Typography/Text.component";

import CompactRestaurantInfo from "../../features/restaurants/UICs/CompactRestaurantInfo.uic";

const FavouritesWrapper = styled(Card)`
  padding: 5px 10px;
  z-index: 999;
  border-radius: 7px;
`;

const FavouriteBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) return null;

  return (
    <FavouritesWrapper elevation={3}>
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
