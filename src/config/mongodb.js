import { MongoClient } from "mongodb"
import {env} from '*/config/environment'

export const connectDB = async () => {

    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    
    try {
        
        // Connect the client to server
        await client.connect()
        console.log('Connecting to server successfully!!!')

        // list databases 
        await listDatabases(client)


    }  finally {
        // Ensurem close the connection when finished
        await client.close()
    }
}

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases()
    console.log(databasesList)
    console.log('Your databases ')
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
}