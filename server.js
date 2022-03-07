require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

// setup morgan
app.use(logger("dev"));

// simple route
app.get("/", (req, res) => {
  res.send("<h1>Restaurant Api</h1>");
});

// routes
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");
const reviewRouter = require("./routes/review.routes");
app.use("/api/users", userRouter);
app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

// connect to database
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
