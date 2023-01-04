import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import {User, UserStore} from '../models/user'

const store = new UserStore()

const create = async (req: Request, res: Response) => {
    const userObject: User = {
        username: req.body.username,
        pass_digest: req.body.pass_digest
    }

    try {
        const user = await store.create(userObject)
        const token = jwt.sign({user: user }, process.env.SECRET as string)
        res.json({token: token})
    } catch (error) {
        res.status(400).json(error)
    }
    
}

const authenticate = async (req: Request, res: Response) => {
   
    const { username, pass_digest } = req.body


    try {
        const user = await store.authenticate(username, pass_digest)
        const token = jwt.sign({user: user }, process.env.SECRET as string)
        res.json({token: token})
    } catch (error) {
        res.status(400).json(error)
    }

}

const userRoutes = (app: express.Application) => {
    app.post('/users', create)
    app.post('/users/:username', authenticate)
}

export default userRoutes