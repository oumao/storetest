import client from '../database'

export type Book = {
    id?: string
    title: string,
    author: string,
    total_pages: number,
    summary: string
}



export class BookModel {

    // async index(): Promise<void> {
    //     try {
    //         const conn = await client.connect()
    //         const result = await conn.query('SELECT 1')
    //         console.log(result.rows) // should print [{ "1": 1 }]
    //     } catch (err) {
    //         console.error(`Error connecting to the database: ${err}`)
    //     }
    // }
    async index (): Promise<Book[]> {
        try {
            // @ts-ignore
            const conn = await client.connect() 

            const sql = `SELECT * FROM book`
            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not retrieve books. Error ${err}`)
        }
    }

    async show (id: string): Promise<Book> {
        try {
            // @ts-ignore
            const conn = await client.connect() 
            const sql = `SELECT * FROM book where id=($1)`
            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch(err) {
            throw new Error(`Could not retrieve book with id ${id}. Error ${err}`)
        }
    }

    async create(b: Book): Promise<Book> {
        try {
            // @ts-ignore
            const conn = await client.connect() 
            const sql = `INSERT INTO book (title, author, total_pages, summary) 
                        VALUES($1, $2, $3, $4) RETURNING *`
            
            const result = await conn.query(sql, [b.title, b.author, b.total_pages, b.summary])

            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Could not create book ${b.title}. Error: ${err}`)
        }
    }
}