import express from 'express'
import {mapOrder} from './utilities/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 8888

app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr/>')
})

app.listen(port, hostname, () => {
    console.log(`hello ${hostname}:${port}/`)
})