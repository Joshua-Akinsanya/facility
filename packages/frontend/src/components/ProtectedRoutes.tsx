import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuthContext"

export default function ProtectedRoutes(){
	const { isLoggedIn } = useAuth()

	return isLoggedIn ? (<Outlet />): <Navigate to="/login" replace />
}