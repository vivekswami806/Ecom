import express from "express";
import dotenv from "dotenv";
import DbConnect from "./config/DB.js";
import morgan from "morgan";
import authRoute from "./route/authRoute.js";
import categoryRoute from "./route/CategoryRoute.js"
import productRoute from "./route/productRoute.js"
import orderRoute from "./route/orderRoute.js"
import cors from "cors"
let app = express();
//  config
dotenv.config();

// server starting at here
let PORT = process.env.PORT;
let hostName = process.env.hostName;
// for the setting of your body request
app.use(cors())
app.use(express.json());
// this is for morgan
app.use(morgan('dev'))
//authRoute
app.use('/api/v1',authRoute)
app.use('/api/v1',categoryRoute)
app.use('/api/v1', productRoute)
app.use('/api/v1', orderRoute)
app.listen(PORT,hostName,() => {
//database connect are here
  DbConnect()
  console.log(
     `server is on at http://${hostName}:${PORT} in ${process.env.MODE} `
  );
});
