import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app =  express();
app.use(express.json(), cors());
app.use(router);


app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
});