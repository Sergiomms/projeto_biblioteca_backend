import express from "express"
import cors from "cors"
import autoresRoute from "./routes/autores.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/autores", autoresRoute)

app.listen(8800)