require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require('cors')
// routes
const authRoute = require("./routes/auth")
const toDosRoutes = require("./routes/todos")

const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors())

app.get("/api", (req, res) => {
    res.send("Fullstack React Course Express")
})

app.use("/api/auth", authRoute)
app.use("/api/todos", toDosRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to database")

    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(err)
})