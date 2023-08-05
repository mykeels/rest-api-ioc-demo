import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export async function connect({ url = process.env.MONGO_DB_URL } = {}) {
  return mongoose
    .connect(url!)
    .then((connection) => {
      console.log("DB Connected");
      return () => connection.disconnect();
    })
    .catch((err) => {
      console.error("DB Connection Failed", err);
      return Promise.reject(err);
    });
}
