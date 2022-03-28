import express from 'express'
import cors from 'cors'
import { connectDB  } from '*/config/mongodb'
import { env } from '*/config/environment'
import { BoardModel } from '*/models/board.model'
import {apiV1} from '*/routes/v1'
import { corsOptions} from '*/config/cors'
connectDB()
    .then(() => console.log('Connected successfully to database server'))
    .then(() => bootServer())
    .catch(error => {
        console.log('Failed to connect to database server')
        process.exit(1)
    })

const bootServer = () =>{
    const app = express()

    
    app.use(cors(corsOptions))

    // req.body data
    app.use(express.json())

    // use APIs v1
   app.use('/v1', apiV1)
    
    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`hello ${env.APP_HOST}:${env.APP_PORT}/`)
    })
}