import { UserRole, type UserInfo } from "@facility-management/shared"
import UserCard from "../components/UserCard"

export default function AllUsers(){
	const allUsers: UserInfo[] = [
		{
			id: "12345678",
			username: "Joe Gardener",
			email: "j.gardener@domain",
			role: UserRole.USER
		}
	]
	return (
	<div>
		{allUsers.map(user => {
			return <UserCard user={user} />
		})}
	</div>)
}