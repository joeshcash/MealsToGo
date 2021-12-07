import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../../services/favourites/favourites.context";

import SafeArea from "../../../components/utils/SafeArea.component";
import Text from "../../../components/Typography/Text.component";
import Spacer from "../../../components/Spacer/Spacer.component";

import RestaurantInfoCard from "../../restaurants/UICs/RestaurantInfoCard/RestaurantInfoCard.uic";

import { RestaurantList } from "../../restaurants/restaurants.styles";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  const favouritesArray = Object.keys(favourites).map((key) => favourites[key]);

  return favouritesArray.length ? (
    <SafeArea>
      <RestaurantList
        data={favouritesArray}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetails", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
};

export default FavouritesScreen;
