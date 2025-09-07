import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Global is used here to maintain a cached connection across hot reloads in development. This prevents connections growing exponentially during API Route usage.
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let chaced = global.mongoose;

if (!chaced) {
  chaced = global.mongoose = { conn: null, promise: null };
}

// Connection to MongoDB
const dbConnect = async (): Promise<Mongoose> => {
  if (chaced.conn) {
    return chaced.conn;
  }

  if (!chaced.promise) {
    chaced.promise = mongoose
      .connect(MONGODB_URI, { dbName: "devflow" })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB", error);
        throw error;
      });
  }
  chaced.conn = await chaced.promise;
  return chaced.conn;
};

export default dbConnect;
