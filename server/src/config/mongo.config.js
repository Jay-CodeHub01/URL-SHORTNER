import mongoose from "mongoose";

let cachedConnection = globalThis.__mongooseConnection

const connectDB = async () => {
  try {
    if (cachedConnection?.conn) return cachedConnection.conn

    if (!cachedConnection) {
      cachedConnection = globalThis.__mongooseConnection = { conn: null, promise: null }
    }

    if (!cachedConnection.promise) {
      cachedConnection.promise = mongoose.connect(process.env.MONGO_URI)
    }

    cachedConnection.conn = await cachedConnection.promise
    console.log(`MongoDB Connected: ${cachedConnection.conn.connection.host}`);
    return cachedConnection.conn
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;