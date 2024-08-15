import express from "express"
import morgan from "morgan"
import cors from "cors"

import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import authRouter from "./routes/auth.route.js"


const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: message
    })
})

export default app