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
import NavBar from "./components/NavBar.tsx"
import AuthProvider from "./context/AuthContextProvider.tsx"

axios.defaults.headers.post["Content-Type"] = "application/json"

function App() {
	return (
		<div className="min-h-screen bg-neutral-800 text-neutral-100 flow-root">
			<AuthProvider>
				<Router>
					<NavBar />
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
