const express = require('express')
const userRouter = require('./routes/user')
const actorRouter = require('./routes/actor')
const movieRouter = require('./routes/movie')
const reviewRouter = require('./routes/review')
const adminRouter = require('./routes/admin')

require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const {errorHandler} = require("./middlewares/error");
const { sendError} = require("./utils/helper");
mongoose.set("strictQuery", false);

const PORT = 8000;
const app = express()

app.use(express.json())
app.use(cors())

app.use('/user',userRouter)
app.use('/actor',actorRouter)
app.use('/movie',movieRouter)
app.use('/review',reviewRouter)
app.use('/admin',adminRouter)
app.use("/*", (req,res)=>{
    sendError(res, "Not found", 404);
});

app.use(errorHandler)

app.listen(PORT,()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log(`Server started at ${PORT}`)
    } catch (e) {
        console.log(e)
    }
})