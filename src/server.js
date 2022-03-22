import express from 'express'
// import {mapOrder} from '*/utilities/sorts.js'
import { connectDB  } from '*/config/mongodb'
import {env} from '*/config/environment'

const app = express()

connectDB().catch(console.log)

app.get('/', (req, res) => {
    res.end('<h1>Hello World! trieuninhhan</h1><hr/>')
})

app.listen(env.PORT, env.HOST, () => {
    console.log(`hello ${env.HOST}:${env.PORT}/`)
})