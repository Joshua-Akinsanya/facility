import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import facilityRoutes from './routes/facilityRoutes.js'

const app = express()

app.use(express.json())

app.use('/api/v1/facilities', facilityRoutes)

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