import { type FacilityShortInfo } from "@facility-management/shared"

interface FacilityCardProps {
	facility: FacilityShortInfo
}

export default function FacilityCard({ facility }: FacilityCardProps){
	return (
		<div
			className="max-w-100 border-2 border-neutral-100 p-4 space-y-4"
		>
			<h2
				className="text-xl font-bold"
			>
				{facility.facilityName}
			</h2>

			<p>{facility.facilityType}</p>
			
			<div>
				{facility.focusArea.map(area => {
					return (
						<span
							key={area}
							className="inline-block py-1 px-2 bg-green-500/50 text-xs rounded-full"
						>{area}
						</span>
					)
				})}
			</div>

			<p>Capabilities: {facility.capabilities.map((cap, index, array) => {
				let str = cap
				if(index != (array.length -1)){
					str += " | "
				}
				return str
			})}
			</p>
			
			<p>
				Location: {facility.city}, {facility.country}
			</p>
			
			<div
				className="flex flex-row-reverse"
			>
				{
					facility.availability
					? <span className="bg-green-300 py-1 px-2 text-sm font-bold text-green-950/80 rounded-full">Available</span>
					: <span className="bg-red-300 py-1 px-2 text-sm font-bold text-red-950/80 rounded-full">Booked</span>
				}
			</div>
		</div>
	)
}