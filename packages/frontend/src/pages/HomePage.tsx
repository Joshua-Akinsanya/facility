import AllFacilities from "../components/AllFacilities"
import { useAuth } from "../hooks/useAuthContext"

export default function HomePage(){
	const { authInfo, isLoggedIn } = useAuth()

	const user = authInfo?.user

	if(!authInfo || !user || !isLoggedIn){
		return (<></>)
	}

	return (
		<div 
			className=""
		>
			{isLoggedIn
				?(<>
					<h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
					<p 
						className="text-sm"
					>ID: {user.id}</p>
					<p>Email: {user.email}</p>
					<p>Role: {user.role}</p>
					{(user.createdAt != null)?(<p>Created at: {user.createdAt}</p>):"" }
					{(user.updatedAt != null)?(<p>Created at: {user.updatedAt}</p>):"" }

					<AllFacilities />
				</>)
				:""}
		
		</div>
	)
}