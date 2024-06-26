import express  from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors'; 
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js';
import cors from 'cors'
import CategoryRoutes from  './routes/CategoryRoutes.js';
import productRoutes from  './routes/productRoutes.js';

dotenv.config();
//rest object
const app = express()
//Dtabse cnfg
connectDB()


//middleware
app.use(cors())
app.use(express.json()) 
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', CategoryRoutes)
app.use('/api/v1/product', productRoutes)



 app.get('/', (req,res)=>{
    res.send({
        message:"welcome to ecommerce"
    })
 })

const PORT = process.env.PORT || 8080;
 app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white);
 })

