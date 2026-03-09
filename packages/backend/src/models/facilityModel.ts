import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const facilitySchema = new Schema({
	
	facilityName: { type: String, required: true, unique: true },
	facilityOwner: { 
		type: Schema.Types.ObjectId, 
		ref: 'User', 
		required: true, 
		index: true
	},
	facilityType: { type: String, required: true },
	focusArea: { type: [String], required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	address: { type: String, required: true },
	mapsLink: { type: String, required: true },
	website: { type: String, required: false },
	shortDescription: { type: String, required: false },
	whoCanUse: { type: [String], required: true },
	capabilities: { type: [String], required: true },
	equipment: { type: [String], required: true },
	pricingModel: { type: String, required: true },
	contactName: { type: String, required: true },
	contactEmail: { type: String, required: true },
	contactPhone: { type: String, required: true },
}, { timestamps: true })

export type Facility = InferSchemaType<typeof facilitySchema>

export default mongoose.model<Facility>('Facility', facilitySchema)