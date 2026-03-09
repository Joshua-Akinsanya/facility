import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuthContext"

interface LogoutButtonProps {
	className?: string
}

export default function LogoutButton({ className="" }: LogoutButtonProps) {
	const navigate = useNavigate()
	const { logout } = useAuth()

	const handleLogout = async () => {
		if( await logout()) {
			navigate("/login")
		} else {
			alert("Could not logout")
		}
	}

	return (
		<button
			onClick={handleLogout}
			className={`inline-block px-2 py-1 bg-gray-600 font-bold ${className}`}
		>
			Logout	
		</button>
	)
}