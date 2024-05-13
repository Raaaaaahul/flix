import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect("mongodb+srv://rahulreo09:rahul123@cluster0.kix8iob.mongodb.net/")
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connection;
