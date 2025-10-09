import express from "express"
import cors from "cors"
import autoresRoute from "./routes/autores.js"
import livrosRoute from "./routes/livros.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/autores", autoresRoute)
app.use("/livros", livrosRoute);

app.listen(8800)