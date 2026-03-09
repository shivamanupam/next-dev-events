import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGO_DB_URI = process.env.MONGODB_URI;

if (!MONGO_DB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = (
      await mongoose.connect(MONGO_DB_URI!, options)
    ).isObjectIdOrHexString((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await connectDB.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
