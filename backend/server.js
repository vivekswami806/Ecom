import express from "express";
import dotenv from "dotenv";
import DbConnect from "./config/DB.js";
import morgan from "morgan";
import authRoute from "./route/authRoute.js";
import cors from "cors"
let app = express();
//  config
dotenv.config();
//database connect are here

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
 
app.listen(PORT,hostName,() => {
  DbConnect()
  console.log(
     `server is on at http://${hostName}:${PORT} in ${process.env.MODE} `
  );
});
