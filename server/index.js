import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import route from "./routes/userRoute.js"
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
// const port = 3000;

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
.then(()=>{
    console.log("DB connected successfully!");
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})

app.use("/api",route);