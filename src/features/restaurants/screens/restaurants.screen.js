import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import SearchBar from "../UICs/SearchBar.uic";
import RestaurantInfoCard from "../UICs/RestaurantInfoCard/RestaurantInfoCard.uic";

import Spacer from "../../../components/Spacer/Spacer.component";
import Text from "../../../components/Typography/Text.component";
import SafeArea from "../../../components/utils/SafeArea.component";
import FavouriteBar from "../../../components/Favourite/FavouriteBar.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { LocationContext } from "../../../services/location/location.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { RestaurantList } from "../restaurants.styles";
import FadeInView from "../../../components/Animations/fade.animation";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const {
    onSearch,
    searchTerm,
    errorSearch: locationError,
  } = useContext(LocationContext);
  const { favourites } = useContext(FavouritesContext);

  const favouritesArray = Object.keys(favourites).map((key) => favourites[key]);

  const [isToggled, setIsToggled] = useState(false);

  const hasError = (!!error || !!locationError) && !isLoading;

  return (
    <SafeArea>
      <SearchBar
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
        onSearch={onSearch}
        searchTerm={searchTerm}
      />

      {isToggled && (
        <FavouriteBar
          favourites={favouritesArray}
          onNavigate={navigation.navigate}
        />
      )}

      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the datas</Text>
        </Spacer>
      )}

      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetails", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};

export default RestaurantsScreen;
