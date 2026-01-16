require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
    res.json({ message: "Node backend running 🚀" });
});

const portfolioRoutes = require("./routes/portfolio.routes");
app.use("/", portfolioRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
