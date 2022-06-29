import app from './app'
import { config } from 'dotenv'
import { Request, Response } from 'express'

config()

const port: string = process.env.PORT || '4100'

app.listen(port, () => {
    console.log('> The server is running at port: ' + port)
})

app.get('', (req: Request, res: Response) => {
    res.send('Hello world')
})