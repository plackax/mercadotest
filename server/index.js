import express from "express";
import cors from "cors";
import routes from "./routes/items.js";

const PORT = 8081;
const app = express();

app.use(cors());
app.use('/api', routes);

app.listen(process.env.PORT || PORT, () => console.log(`ML server started on port ${process.env.PORT || PORT}!`));