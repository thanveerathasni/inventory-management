import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
import helmet from "helmet"

import { errorMiddleware } from "./middleware/error.middleware";

const app = express()

app.use(helmet())
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
)


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running.',
  });
});
app.use(errorMiddleware)

export default app;