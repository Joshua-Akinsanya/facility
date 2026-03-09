export interface FacilityInfo {
	facilityName: string
	facilityOwner: string
	facilityType: string
	focusArea: string[]
	city: string
	country: string
	address: string
	mapsLink: string
	website: string
	shortDescription?: string
	whoCanUse: string[]
	capabilities: string[]
	equipment: string[]
	pricingModel: string
	contactName: string
	contactEmail: string
	contactPhone: string
}

// Info regular users will see at first glance
export interface FacilityShortInfo {
	facilityName: string
	facilityType: string
	focusArea: string[]
	city: string
	country: string
	capabilities: string[]
	availability: boolean // Whether booked or not based on who can use
	shortDescription?: string
}

//Facility owner will be filled automatically using user authentication info
export type FacilityForm = Omit<FacilityInfo, 'facilityOwner' | 'whoCanUse'>