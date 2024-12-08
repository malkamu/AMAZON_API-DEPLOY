const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/payment/create", async (req, res) => {
  const totalAmount =parseInt(req.query.total);
  if (totalAmount > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });
    res.status(201).json({
      clientScerete: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({ message: "Total amount mus be greater than zero!" });
  }
});
// localhost.com=> 127.0.0.1
app.listen(4050, (error) => {
  if (error) throw error;
  console.log(
    "Amazon server is running on the port 4050,http://localhost:4050"
  );
});
