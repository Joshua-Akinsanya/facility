import AllFacilities from "../components/AllFacilities"
import { UserRole, type UserInfo } from "@facility-management/shared"

export default function HomePage(){
	const user: UserInfo = {
		id: '1234567',
		username: 'Joe Salazar',
		email: 'j.salazar@domain',
		role: UserRole.USER
	}
	return (
		<div 
			className=""
		>
			<h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
			<p>ID: #{user.id}</p>
			<p>Email: {user.email}</p>
			<p>Role: {user.role}</p>
			{(user.createdAt != null)?(<p>Created at: {user.createdAt}</p>):"" }
			{(user.updatedAt != null)?(<p>Created at: {user.updatedAt}</p>):"" }

			<AllFacilities />
		</div>
	)
}