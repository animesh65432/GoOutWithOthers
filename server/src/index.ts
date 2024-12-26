import "dotenv/config"
import express from "express"
import cokkieparser from "cookie-parser"
import { userrouter } from "./routers"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cokkieparser())
app.use(cors())
app.use("/user", userrouter)





app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})