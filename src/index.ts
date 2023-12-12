import app from "./app";
import { dbConnect } from "./db";

const PORT = 3000;
dbConnect();
app.listen(PORT);
console.log(`Server listening on port: ${PORT}`);
