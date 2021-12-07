import createStripe from "stripe-client";

import { host } from "../../utils/env";

const stripe = createStripe(
  "pk_test_51Jzr3YAEmoljYpdF4eqFZnacUKliHsqu3LpLM69altxfPfylKIz00biMYlfnpYyZvg82C4NfIH5TKUv3fPiW4eeK00HaToc1DY"
);

export const cardTokenRequest = (card) =>
  stripe.createToken({
    card,
  });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    console.log(res.status);
    if (res.status > 200) {
      return Promise.reject("Something went wrong processing your payment");
    }

    return res.json();
  });
};
