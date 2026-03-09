import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserRole, type NewUserInfo } from "@facility-management/shared"
import TextInputField from "../components/TextInputField"
import { useState, type ChangeEvent, type SubmitEvent } from "react"

export default function SignupPage(){
	const [newUser, setNewUser] = useState<NewUserInfo>({
		username: "",
		email: "",
		password: "",
		role: UserRole.USER
	})

	const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setNewUser(prev => ({
			...prev,
			username: e.target.value
		}))
	}

	const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setNewUser(prev => ({
			...prev,
			email: e.target.value
		}))
	}

	const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setNewUser(prev => ({
			...prev,
			password: e.target.value
		}))
	}

	const updateRole = (e: ChangeEvent<HTMLSelectElement>) => {
		setNewUser(prev => {
			let r
			switch (e.target.value){
				case UserRole.ADMIN:
					r = UserRole.ADMIN
					break
				case UserRole.OWNER:
					r = UserRole.OWNER
					break
				default:
					r = UserRole.USER	
			}
			return {
				...prev,
				role: r
			}
		})
	}

	const navigate = useNavigate()
	const handleSignup = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await 
				axios.post("http://localhost:3000/api/v1/users/new", newUser)
			
			console.log(response.data)
			alert('Success')
			navigate('/login')
		} catch (error) {
			console.log(error)
			alert('An error occurred')
		}
	}

	return (<form
		onSubmit={handleSignup}
		className="max-w-100 mx-auto space-y-4"
	>
		<h1
			className="text-2xl text-center mb-8"
		>Sign up!</h1>
		<div>
			<div
				className="flex flex-col gap-y-3"
			>
				<TextInputField 
					placeholder="Username" 
					value={newUser.username}
					onChange={updateUsername}
					required 
				/>
				<TextInputField 
					type="email" 
					placeholder="Email" 
					value={newUser.email}
					onChange={updateEmail}
					required 
				/>
				<TextInputField 
					type="password" 
					placeholder="Password"
					value={newUser.password}
					onChange={updatePassword}
					required 
				/>
				<select 
					name="role" 
					id=""
					className="border px-2 py-1.5 outline-none"
					onChange={updateRole}
				>
					{Object.values(UserRole).map((role) => {
						return (<option 
							key={role}
							value={role}>{role}
						</option>)
					})}
				</select>
				<button
					className="bg-green-500 w-full mt-2 px-4 py-2 cursor-pointer"
					type="submit"
				>Sign In
				</button>
			</div>
		</div>
	</form>)
}