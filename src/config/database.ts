import { DataSource, DataSourceOptions } from "typeorm"

const { DB_CONNECTION, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env

export const AppDataSource = new DataSource({
  type:DB_CONNECTION,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: true,
})