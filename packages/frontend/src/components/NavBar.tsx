import { useAuth } from "../hooks/useAuthContext"
import RouteLink from "./RouteLink"
import LogoutButton from "./LogoutButton"

export default function NavBar(){
	const { isLoggedIn } = useAuth()
	return(
		<nav className="flex justify-center flex-wrap p-4 border-b-2 mb-8 border-neutral-500">
			<RouteLink to="/login">Login</RouteLink>
			<RouteLink to="/signup">Sign up</RouteLink>
			{isLoggedIn && (<>
				<RouteLink to="/home">Home</RouteLink>
				<RouteLink to="/allusers">Users</RouteLink>
				<RouteLink to="/new-facility">New</RouteLink>
				<LogoutButton />
			</>)}
		</nav>
	)
}