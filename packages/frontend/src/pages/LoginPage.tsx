import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import TextInputField from "../components/TextInputField"
import { type UserLoginPayload } from "@facility-management/shared"
import { useAuth } from "../hooks/useAuthContext"

export default function LoginPage(){
	const { login } = useAuth()
	const navigate = useNavigate()
	const [loginPayload, setLoginPayload] = useState<UserLoginPayload>({
		usernameOrEmail: "",
		password: ""
	})

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginPayload(prev => ({
			...prev,
			usernameOrEmail: e.target.value
		}))
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginPayload(prev => ({
			...prev,
			password: e.target.value
		}))
	}
	const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if( await login(loginPayload) ){
			navigate("/home")
		}
	}
	
	return (<form
		onSubmit={handleLogin}
		className="max-w-100 mx-auto space-y-4"
	>
		<h1
			className="text-2xl text-center mb-8"
		>Login Page</h1>
		<div
			className=""
		>
			<div
				className="flex flex-col gap-y-3"
			>
				<TextInputField 
					placeholder="Username or Email" 
					value={loginPayload?.usernameOrEmail}
					onChange={handleUsernameChange}
				/>
				<TextInputField 
					type="password" 
					placeholder="Password" 
					onChange={handlePasswordChange}
				/>
				<button
					type="submit"
					className="bg-green-700 w-full mt-2 px-4 py-2 cursor-pointer"
				>Sign In
				</button>
			</div>
		</div>
	</form>)
}