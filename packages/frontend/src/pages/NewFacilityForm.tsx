// import { type FacilityForm } from "@facility-management/shared"
import TextInputField from "../components/TextInputField"

export default function NewFacilityForm(){
	const handleSubmit = () => {
		window.alert('Form submitted')
	}

	// const fac: FacilityForm
	return (
		<div
			className="w-4/5 max-w-200 mx-auto space-y-10"
		>
			<div
				className="space-y-4"
			>
				<TextInputField name="facilityName" placeholder="Facility Name" required />
				<TextInputField name="facilityType" placeholder="Facility Type" required />
				<TextInputField name="focusArea" placeholder="Focus Area" required />
				<TextInputField name="city" placeholder="City" required />
				<TextInputField name="country" placeholder="Facility Name" required />
				<TextInputField name="address" placeholder="Address" required />
				<TextInputField name="mapsLink" placeholder="Link to location on map" required />
				<TextInputField name="website" placeholder="Website Link" required />
				<textarea
					className="border w-full px-2 py-0.5 min-h-16 resize-none outline-none" 
					maxLength={250}
					placeholder="Short Description"
				></textarea>
				<TextInputField name="capabilities" placeholder="Capabilities" required />
				<TextInputField name="equipment" placeholder="Equipment" required />
				<TextInputField placeholder="Pricing" />
				<TextInputField name="contactName" placeholder="Facility Name" required />
				<TextInputField name="contactEmail" placeholder="Email Address" required />
				<TextInputField name="contactPhone" placeholder="Phone Number" required />
			</div>
			<button
				onClick={handleSubmit}
				className="w-full py-2 px-4 bg-green-500 font-bold cursor-pointer"
			>Submit</button>
		</div>
	)
}