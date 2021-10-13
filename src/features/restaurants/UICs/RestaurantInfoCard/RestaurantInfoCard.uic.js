import React from "react";
import { SvgXml } from "react-native-svg";

import star from "../../../../../assets/star";
import open from "../../../../../assets/open";

import Spacer from "../../../../components/Spacer/Spacer.component";
import Text from "../../../../components/Typography/Text.component";
import Favourite from "../../../../components/Favourite/Favourite.component";

import {
  Address,
  CardContainer,
  Cover,
  Info,
  Rating,
  Row,
  RowEnd,
  Icon,
} from "./RestaurantInfoCard.styles";

const RestaurantInfoCard = ({
  restaurant = {},
  isFavourite,
  handleFavourite,
}) => {
  const {
    name = " Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <CardContainer elevation={5}>
      <Favourite item={restaurant} />
      <Cover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Row>
          <Rating>
            {ratingArray.map((_, idx) => (
              <SvgXml key={idx} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <RowEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={30} height={30} />}
            </Spacer>

            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </RowEnd>
        </Row>
        <Address>{address}</Address>
      </Info>
    </CardContainer>
  );
};

export default RestaurantInfoCard;
