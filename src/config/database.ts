import 'dotenv/config'

import { DataSource } from "typeorm"

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
})

export default AppDataSource