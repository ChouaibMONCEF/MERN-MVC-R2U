const express = require("express")
const session = require("express-session")
require('./env')
const app = express()


const userRoute = require("./routes/User")

app.use("/user", userRoute)

const PORT = process.env.PORT  || 5000 
app.listen(PORT, () => console.log(`server is running ${PORT}`));