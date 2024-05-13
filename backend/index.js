import express from "express";
import dotenv from "dotenv";
import connection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import cors from "cors";
connection();
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://flix-omega.vercel.app",
  methods: ["POST", "GET"],
  credentials: true,
};
app.use(cors(corsOptions));
//apis
app.use("/api/user", userRoute); //http:localhost:8080/api/user/register

dotenv.config({
  path: ".env",
});

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
