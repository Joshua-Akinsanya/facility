import type { LoginSuccessPayload, UserLoginPayload } from "@facility-management/shared"

export interface AuthContextType {
	authInfo: LoginSuccessPayload | null
	isLoggedIn: boolean
	login: (loginPayload: UserLoginPayload) => Promise<boolean>
	logout: () => Promise<boolean>
}