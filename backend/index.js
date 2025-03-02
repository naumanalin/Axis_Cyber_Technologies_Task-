import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// dotenv
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL;

import { connectDB } from './models/connection.js';
connectDB()

import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js'

const app = express()


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "https://budget-tracker-three-beta.vercel.app/", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


// test route
app.get('/test', (req, res)=>{
    res.json({ success: true, message: "ki hal chal lahh...?" });
})

// All Routes
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes)


app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
});

// Export app for Vercel
export default app;
