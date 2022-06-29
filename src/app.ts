import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connectToDB } from './config/db'
import { speciesRouter } from './routes/species'
import { specimensRouter } from './routes/specimens'
import { zookeepersRouter } from './routes/zookeepers'
import { cagesRouter } from './routes/cages'

const doDbConnection = async () => {
  await connectToDB()
}

doDbConnection()

export const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/species', speciesRouter)
app.use('/specimens', specimensRouter)
app.use('/zookeepers', zookeepersRouter)
app.use('/cages', cagesRouter)
app.get('/', (req, res) => res.send('Exemplo TypeORM'))
