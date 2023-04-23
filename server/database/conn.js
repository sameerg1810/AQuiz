// import mongoose from "mongoose";

// export default async function connect() {
//   await mongoose.connect();
//   console.log("database is connected");
// }

import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Database is connected");
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
}
