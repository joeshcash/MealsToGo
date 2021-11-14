const functions = require("firebase-functions");
const url = require("url");

const { mocks, addMockImage } = require("./mock");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;

  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes-600x750.jpg",
    ];

    return restaurant;
  }

  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().geocodeplaces.key
    }`,
  ];

  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;

  if (mock === "true") {
    const data = mocks[location];

    if (data) {
      data.results = data.results.map(addMockImage);
    }

    return response.json(data);
  }

  client
    .placesNearby({
      params: {
        location,
        radius: 1500,
        type: "restaurant",
        key: functions.config().geocodeplaces.key,
      },
      timeout: 5000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addGoogleImage);

      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
