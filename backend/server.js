const express = require('express')
const connectDB = require('./config/db_Config')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 5000

// app.use('/api/user',require('./Routes/userRoutes'))


//database connect function 
connectDB()

//body parser
app.use(cors());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get('/',(req,res)=>{
    res.json({
        message : 'Working fine'
    })
})


app.use("/api/user",require('./Routes/userRoutes'))
app.use("/api/user/carservice",require('./Routes/carRoutes'))
app.use("/api/admin",require('./Routes/amdinRoute'))


app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`)
})