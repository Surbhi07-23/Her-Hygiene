const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB =  require("./config/db.js");
const auth = require("./middleware/auth.js");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth" , require("./routes/Auth.js"));

app.get("/api/protected" , auth , (req,res) => {
    res.json({
        message : "Protected data",
        user : req.user
    });
});

app.use("/api/period" , require("./routes/period.js"));

app.get("/" , (req,res) => {
    res.send("app is running"); 
}); 

const PORT = process.env.PORT;

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
});