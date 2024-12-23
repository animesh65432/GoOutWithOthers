import "dotenv/config"
import express from "express"


const app = express()

app.get("/", async (req, res) => {
    try {

        res.status(401).json({
            error: "User must sign in"
        });
        return;
    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error"
        })
        return

    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})