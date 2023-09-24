const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const morgan = require("./config/morgan");
const {userAuthRoute,authRoute} = require('./api/routes');
const {globalErrorHandler} = require("./api/middlewares")

const appLoader = async(app)=>{
    app.get('/',(req,res)=>{
        res.status(200).end();
    })

    app.head('/',(req,res)=>{
        res.status(200).end();
    })

    if(config.mode!=="test"){
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }

    app.use(express.json())
    app.use(cors({
        origin : config.client_url
    }))

    app.use(express.urlencoded({ extended: true }));


    app.use(userAuthRoute);
    app.use('/api/auth',authRoute);


    app.use(globalErrorHandler)

}

module.exports=appLoader;