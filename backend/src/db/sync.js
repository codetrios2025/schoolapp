import connectDB from "./index.js";

await connectDB();
console.log("DB connected");
process.exit(0);
