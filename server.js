require("dotenv").config();
const express = require("express")

const app = express();

app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.send("Fullstack React Course Express")
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})