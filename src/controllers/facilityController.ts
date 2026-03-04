import { type Request, type Response } from 'express'
import mongoose from 'mongoose'
import facilityModel, { type Facility } from '../models/facilityModel.js'


interface IParamFacilityID {
	id: string
}

const getFacilities = async (req: Request, res: Response) => {
	try {
		const allFacilities: Facility[] = await facilityModel.find({}).sort({ createdAt: -1})
		res.status(200).json(allFacilities)
	} catch(error) {
		res.status(400).json({ error: error })
	}
}


const getFacilityWithID = async (req: Request<IParamFacilityID>, res: Response) => {
	const { id } = req.params

	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'Facility not found'})
	}

	const facility = await facilityModel.findById(id)

	if(!facility){
		return res.status(404).json({error: 'Facility not found'})
	}
	res.status(200).json(facility)
}


const saveFacility = async (req: Request<Facility>, res: Response) => {
	const fac: Facility = req.body
	
	try {
		const facility = await facilityModel.create(fac)
		res.status(201).json(facility)
	} catch (error) {
		res.status(400).json({error: error})
	}
}


const deleteFacility = async (req: Request<IParamFacilityID>, res: Response) => {
	const { id } = req.params
	
	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'Facility not found'})
	}

	const facility = await facilityModel.findOneAndDelete({_id: id})

	if(!facility) {
		return res.status(404).json({error: 'Facility not found'})
	}

	res.sendStatus(204)
}


const updateFacility = async (req: Request<IParamFacilityID, any, Facility>, res: Response) => {
	const { id } = req.params
	const facility = req.body

	if(!id){
		return res.status(400).json({error: 'ID not sent'})
	}

	if(!mongoose.Types.ObjectId.isValid(id)){
		return res.status(404).json({error: 'Facility not found'})
	}

	const updatedFacility = await facilityModel.findOneAndUpdate({_id: id}, {...facility})

	if(!updatedFacility){
		return res.status(404).json({error: 'Facility not found'})
	}

	res.status(200).json(updatedFacility)
}


export {
	getFacilities,
	getFacilityWithID,
	saveFacility,
	deleteFacility,
	updateFacility
}