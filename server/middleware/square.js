/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */
const request = require("request-promise");

module.exports.checkout = function(req, res, next) {
  let cardNonce = req.body.nonce;
  const tax = 0.0; // TODO: Add Tax Logic
  let total = cartItems.reduce((a, b) => a.Item.price + b.Item.price, tax);

  const location = "CBASEDnEqxa5dSbQs3ak_XJtqiwgAQ";
  // Sandbox access token TODO: add this as env variable when we do actually go to production
  const accessToken = "sandbox-sq0atb-AIVmTputqFCPd4pTVProVQ";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    uri: `https://connect.squareup.com/v2/locations/${location}/transactions`,
    body: JSON.stringify({
      card_nonce: cardNonce,
      amount_money: {
        amount: total,
        currency: "USD"
      },
      idempotency_key: str(uuidv4())
    })
  };

  console.log(requestOptions);

  request(options).then(response => {
    res.status(200).json(response);
  }).catch(error => {
    console.log(error);
    res.status(500).send("Failed to Send Sqaure Transaction");
  });
};


function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}