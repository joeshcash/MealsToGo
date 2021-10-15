import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const RestaurantSearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const SearchBar = ({
  onSearch,
  searchTerm,
  onFavouritesToggle,
  isFavouritesToggled,
}) => {
  const [searchKeyword, setSearchKeyword] = useState(searchTerm);

  useEffect(() => {
    setSearchKeyword(searchTerm);
  }, [searchTerm]);

  return (
    <RestaurantSearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        onSubmitEditing={() => {
          onSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        value={searchKeyword}
      />
    </RestaurantSearchContainer>
  );
};

export default SearchBar;
