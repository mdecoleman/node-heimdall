import mongoose from "mongoose";

export const connect = async () => {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const db = process.env.MONGODB_DB;
  const url = process.env.MONGODB_URL;

  const connectionString = `mongodb+srv://${username}:${password}@${url}/${db}?retryWrites=true&w=majority`;

  console.info("Connecting: db");

  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  console.info("Connected: db");
};
