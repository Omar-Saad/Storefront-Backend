import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_PORT = process.env.POSTGRES_PORT
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB
const ENV = process.env.ENV

let client: Pool;
if(ENV === 'test') {
 client = new Pool({
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    })
  }

  else {

 client = new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})
  }

export default client