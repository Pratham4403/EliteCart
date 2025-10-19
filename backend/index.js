const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/DataBase");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json({limit :"50mb"}));
app.use(cookieParser());

app.use("/api",router);

const PORT = 1856 || process.env.PORT;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connected to database");
        console.log("Server is listening to 1856 port!");
    });
})