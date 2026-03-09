import FacilityCard from "./FacilityCard"
import { type FacilityShortInfo } from "@facility-management/shared"

export default function AllFacilities(){
	const allFacilities: FacilityShortInfo[] = [
		{
			facilityName: "Facility 1",
			facilityType: "Construction",
			focusArea: ["Construction"],
			city: "Lagos",
			country: "Nigeria",
			capabilities: ["Construction", "Engineering"],
			availability: true
		},
		{
			facilityName: "Facility 2",
			facilityType: "Chemical Plant",
			focusArea: ["Fertilizers", "Plastics"],
			city: "Ota",
			country: "Nigeria",
			capabilities: ["Chemistry", "Agric", "Engineering"],
			availability: true
		}
	]
	return (
		<div>
			{allFacilities.map(facility => {
				return (
					<FacilityCard facility={facility} />
				)
			})}
		</div>
	)
}