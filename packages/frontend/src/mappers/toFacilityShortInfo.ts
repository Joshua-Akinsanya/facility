import type { FacilityInfo, FacilityShortInfo } from "@facility-management/shared";

export function toFacilityShortInfo(f: FacilityInfo): FacilityShortInfo {
	return {
		facilityName: f.facilityName,
		facilityType: f.facilityType,
		focusArea: f.focusArea,
		city: f.city,
		country: f.country,
		capabilities: f.capabilities,
		availability: (f.whoCanUse.length === 0)?true:false,
		shortDescription: f.shortDescription
	}
}