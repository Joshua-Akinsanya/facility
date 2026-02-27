import mongoose, { type InferSchemaType } from 'mongoose'

const Schema = mongoose.Schema

const facilitySchema = new Schema({
	
	facilityName: { type: String, required: true, unique: true },
	facilityType: { type: String, required: true },
	focusArea: { type: Array, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	address: { type: String, required: true },
	mapsLink: { type: String, required: true },
	website: { type: String, required: false },
	shortDescription: { type: String, required: false },
	whoCanUse: { type: String, enum: ['admin'], required: true },
	capabilities: { type: String, required: true },
	equipment: { type: String, required: true },
	pricingModel: { type: String, required: true },
	contactName: { type: String, required: true },
	contactEmail: { type: String, required: true },
	contactPhone: { type: String, required: true },
	lastUpdated: { type: Date, default: Date.now }

}, { timestamps: true })

export type Facility = InferSchemaType<typeof facilitySchema>

export default mongoose.model<Facility>('Facility', facilitySchema)