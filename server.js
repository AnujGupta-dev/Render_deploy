import express from 'express';
import dotenv from 'dotenv'
import dbconnect from './config/database.js'
import router from './routes/userRoutes.js';

const app = express();

dotenv.config()
const PORT = process.env.PORT || 4000 ;

app.use(express.static('dist'))

app.use(express.json());
app.use("/api" , router)

dbconnect();

app.get('/',(req,res)=>{
    res.send("Home page babay")
})

app.listen(PORT , ()=>{
    console.log(`server is ready at ${PORT}`);
    
})