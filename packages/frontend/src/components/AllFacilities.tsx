import axios from "axios"
import FacilityCard from "./FacilityCard"
import { type FacilityInfo, type FacilityShortInfo } from "@facility-management/shared"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuthContext"
import { toFacilityShortInfo } from "../mappers/toFacilityShortInfo"
import RefetchButton from "./RefetchButton"

export default function AllFacilities(){
	const { authInfo } = useAuth()
	
	const [facilities, setFacilities] = useState<FacilityShortInfo[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	
	useEffect(() => {
		const getFacilities = async () => {
			setError("")
			setLoading(true)
			
			try{
				const response = await axios.get<FacilityInfo[]>("http://localhost:3000/api/v1/facilities", {
					headers: {
						Authorization: `Bearer ${authInfo?.accessToken}`
					}
				})
				setFacilities(response.data.map(toFacilityShortInfo))
				setLoading(false)
			} catch {
				setLoading(false)
				setError("An error occured")
			}
		}
		getFacilities()
	}, [authInfo])

	return (
		<div>
			{(error.length > 0) && (<>
				<p>{error}</p>
				<RefetchButton />
			</>)}
			
			{loading && "Loading Data..." }
			{facilities.map(facility => {
				return (
					<FacilityCard 
						key={facility.facilityName} 
						facility={facility} 
					/>
				)
			})}
		</div>
	)
}