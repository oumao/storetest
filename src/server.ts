import bodyParser from 'body-parser'
import express, {Request, Response} from 'express' 
import dotenv from 'dotenv'

import booksRoutes from './handlers/books'
import userRoutes from './handlers/user'

dotenv.config()


const app: express.Application = express() 

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Testing")
})


// booksRoutes(app)
userRoutes(app)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
})