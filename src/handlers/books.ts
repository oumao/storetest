import express, {Request, Response} from 'express'

import {Book, BookModel} from '../models/book'

const store = new BookModel()

const index = async (_req: Request, res: Response) => {
    const books = await store.index()
    res.json(books)
}

const create =async (req: Request, res: Response) => {
    const book: Book = {
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        summary: req.body.summary
    }

    try {
        const result = await store.create(book)
        res.json(result)
    } catch (error) {
      res.json(error)  
    }
}

const booksRoutes = (app: express.Application) => {
    app.get('/books', index)
    app.post('/books', create)
}

export default booksRoutes