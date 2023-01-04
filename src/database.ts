import { Pool } from "pg"
import dotenv from 'dotenv'

dotenv.config()

const {
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASS,
    ENV
} = process.env


let client: any

if(ENV === 'dev'){
    
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASS
    })
}


if(ENV === 'test'){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASS
    })
}


export default client