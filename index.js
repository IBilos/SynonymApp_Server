const express = require("express");
const cors = require('cors')
const synonymsRoutes = require("./routes/synonyms");

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
  }))

app.use("/synonyms", synonymsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
