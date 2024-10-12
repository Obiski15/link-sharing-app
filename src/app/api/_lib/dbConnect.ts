import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URL!?.replace(
        "%PASSWORD%",
        process.env.MONGODB_PASSWORD!
      ),
      { dbName: "link-sharing-app" }
    );
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default dbConnect;
