import axios from "axios"
import { type UserInfo } from "@facility-management/shared"
import UserCard from "../components/UserCard"
import { useEffect, useState } from "react"
import RefetchButton from "../components/RefetchButton"
import { useAuth } from "../hooks/useAuthContext"

export default function AllUsers(){
	const [allUsers, setAllUsers] = useState<UserInfo[]>([])

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const { authInfo } = useAuth()

	const getUsers = async () => {
		setLoading(true)
		setError("")
		try { 
			const response = await axios.get<UserInfo []>("http://localhost:3000/api/v1/users/all", {
				headers: {
					Authorization: `Bearer ${authInfo?.accessToken}`
				}
			})
			setAllUsers(response.data)
			setLoading(false)
		} catch(error) {
			console.log(error)
			setLoading(false)
			setError("Couldn't get user data")
		}
	}

	useEffect(() => {
		const getUsers = async () => {
			setLoading(true)
			setError("")
			try { 
				const response = await axios.get<UserInfo []>("http://localhost:3000/api/v1/users/all", {
					headers: {
						Authorization: `Bearer ${authInfo?.accessToken}`
					}
				})
				setAllUsers(response.data)
				setLoading(false)
			} catch {
				console.log(error)
				setLoading(false)
				setError("Couldn't get user data")
			}
		}

		getUsers()
	}, [])

	return (
	<div>
		{allUsers.map(user => {
			return <UserCard key={user.id} user={user} />
		})}
		{loading && <p>Sending request...</p>}
		{ (error.length > 0) && (<>
			<p>{error}</p>
			<RefetchButton
				onClick={() => getUsers()}
			/>
		</>)}
	</div>)
}