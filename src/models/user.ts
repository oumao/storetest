import client from "../database"
import bcrypt from "bcrypt"
import dotenv from 'dotenv'

dotenv.config()

export type User = {
    id?: string,
    username: string,
    pass_digest: string
}

const SALT_ROUNDS = process.env.SALT_ROUNDS as string
const pepper = process.env.PEPPER as string

export class UserStore {

    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect()

            const sql = 'INSERT INTO users (username, pass_digest) VALUES($1, $2) RETURNING *'
                        
            const hashed_pass = bcrypt.hashSync(u.pass_digest+pepper, parseInt(SALT_ROUNDS))
            // console.log(hashed_pass)

            const result = await conn.query(sql, [u.username, hashed_pass])

            const user = result.rows[0]
            
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Couldnot create user ${u.username}. Error ${err}`)
        }
    }


    async authenticate(username: string, pass_digest: string): Promise<User | null> {
        try {// @ts-ignore
            const conn = await client.connect()
            const sql = `SELECT * FROM users where username=($1)`
            
            const result = await conn.query(sql, [username])

            if(result.rows.length){
                const user = result.rows[0]

                if(bcrypt.compareSync(pass_digest+pepper, user.pass_digest)){
                    return user
                }
            }

            return null
        } catch (err) {
            throw new Error(`Couldnot find user with username: ${username}. Error ${err}`)
        }
    }
}