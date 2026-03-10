import axios from "axios"

import type {	 
	UserLoginPayload, 
	LoginSuccessPayload 
} from "@facility-management/shared"

import { AuthContext } from "./AuthContext"
import { useState, type ReactNode } from "react"

export default function AuthProvider({ children }: { children: ReactNode}) {
	const [authInfo, setAuthInfo] = useState<LoginSuccessPayload | null>(null)

	const login = async (loginPayload: UserLoginPayload): Promise<boolean> => {
		try {
			const response = await axios.post<LoginSuccessPayload>("http://localhost:3000/api/v1/users/login",
				loginPayload
			)
			console.log(response.data)
			setAuthInfo(response.data)
			return true

		} catch(error) {
			console.log(error)
			return false
		}
	}

	const logout = async () => {
		console.log("Log out logic")
		setAuthInfo(null)
		return true
	}

	return (
		<AuthContext.Provider value={{ 
			authInfo, 
			isLoggedIn: (authInfo)?true:false,
			login,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	)
}