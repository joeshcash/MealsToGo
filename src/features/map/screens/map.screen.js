import React, { useContext } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";

import SearchBar from "../UICs/SearchBar.uic";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const MapScreen = () => {
  const { onSearch, searchTerm } = useContext(LocationContext);

  return (
    <>
      <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
      <Map />
    </>
  );
};

export default MapScreen;
