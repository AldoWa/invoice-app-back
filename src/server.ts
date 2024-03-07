import express from 'express'
import 'reflect-metadata'

import AppDataSource from './config/database'
import { routes } from './routes';

const app = express();

app.use(express.json())

app.use(routes)

app.listen(3000, () => console.log("Server is running on port 3000"))

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized')
}).catch((err) => {
  console.log(err)
})