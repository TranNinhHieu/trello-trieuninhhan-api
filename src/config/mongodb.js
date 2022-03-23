import { MongoClient } from "mongodb"
import {env} from '*/config/environment'

let dbInstance = null

export const connectDB = async () => {

    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    // Connect the client to server
    await client.connect()

    // Asign clientDB to our dbInstance
    dbInstance = client.db(env.DATABASE_NAME)    
}


// get database instance
export const getDB = () =>{
    if(!dbInstance) throw new Error ('Must connect to Database first')
    return dbInstance
}