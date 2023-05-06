import { app } from './app.js'
import { connectDB } from "./data/db.js";

connectDB();
console.log(process.env.PORT);
app.listen(5000, () => {
  console.log(`server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
