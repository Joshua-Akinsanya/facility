import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import { 
	LoginPage, 
	SignupPage, 
	HomePage,
	AllUsers,
	NotFound,
	NewFacilityForm
} from "./pages/pages.ts"
import ProtectedRoutes from "./components/ProtectedRoutes.tsx"
import RouteLink from "./components/RouteLink"
import AuthProvider from "./context/AuthContextProvider.tsx"
import LogoutButton from "./components/LogoutButton.tsx"

axios.defaults.headers.post["Content-Type"] = "application/json"

function App() {
	
	return (
		<div className="min-h-screen bg-neutral-800 text-neutral-100 flow-root">
			<AuthProvider>
				<Router>
					<nav className="flex justify-center flex-wrap p-4 border-b-2 mb-8 border-neutral-500">
						<RouteLink to="/login">Login</RouteLink>
						<RouteLink to="/signup">Sign up</RouteLink>
						<RouteLink to="/home">Home</RouteLink>
						<RouteLink to="/allusers">Users</RouteLink>
						<RouteLink to="/new-facility">New</RouteLink>
						<LogoutButton />
					</nav>
					<div className="w-9/10 sm:w-4/5 max-w-200 mx-auto mb-16">
						<Routes>
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/login" element={<LoginPage />} />
							
							<Route element={ <ProtectedRoutes/> }>
								<Route path="/home" element={<HomePage />} />
								<Route path="/allusers" element={<AllUsers />} />
								<Route path="/new-facility" element={<NewFacilityForm />} />
							</Route>
							{/* Default */ }
							<Route path="/" element={<Navigate to="/login" replace />} />
							{/* 404 */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</Router>
			</AuthProvider>
		</div>
	)
}

export default App
