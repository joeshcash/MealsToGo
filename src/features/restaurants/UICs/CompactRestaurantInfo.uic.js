import React from "react";
import styled, { css } from "styled-components/native";
import WebView from "react-native-webview";
import { Platform } from "react-native";

import Text from "../../../components/Typography/Text.component";

const compactStyles = css`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const CompactImage = styled.Image`
  ${compactStyles}
`;

const CompactWebview = styled(WebView)`
  ${compactStyles}
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

const CompactRestaurantInfo = ({ restaurant, isMap = false }) => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;

  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};

export default CompactRestaurantInfo;
