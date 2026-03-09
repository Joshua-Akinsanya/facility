import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import facilityRoutes from './routes/facilityRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/facilities', facilityRoutes)

app.use('/api/v1/users', userRoutes)

const mongoURI = process.env.MONGO_URI

if(!mongoURI) {
	throw new Error('MONGO_URI is not defined')
}

mongoose.connect(mongoURI)
	.then(() => {
		console.log('Successfully connected to Database')
		app.listen(process.env.PORT, () => {
			console.log(`http://localhost:${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})