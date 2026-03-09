import { Link } from "react-router-dom"

interface LinkProps {
	to: string
	children: string
}

export default function RouteLink({to, children}: LinkProps){
	return (
		<Link to={to}
			className="underline hover:bg-green-900 py-2 px-5"
		>{children}</Link>
	)
}