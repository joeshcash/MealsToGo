import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const RestaurantSearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  width: 100%;
  z-index: 999;
  top: 40px;
`;

const SearchBar = ({ onSearch, searchTerm }) => {
  const [searchKeyword, setSearchKeyword] = useState(searchTerm);

  useEffect(() => {
    setSearchKeyword(searchTerm);
  }, [searchTerm]);

  return (
    <RestaurantSearchContainer>
      <Searchbar
        placeholder="Search for a location"
        onSubmitEditing={() => {
          onSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        value={searchKeyword}
        icon="map"
      />
    </RestaurantSearchContainer>
  );
};

export default SearchBar;
