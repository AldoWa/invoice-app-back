import express from 'express'
import 'reflect-metadata'
import 'dotenv/config'

import { AppDataSource } from './config/database'

const app = express();

app.listen(3000, () => console.log("Server is running on port 3000"))

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized')
}).catch((err) => {
  console.log(err)
})