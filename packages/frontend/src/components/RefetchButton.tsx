interface RefetchButtonProps {
	onClick?: () => void
}

export default function RefetchButton({ onClick = undefined }: RefetchButtonProps){
	return (<button
		onClick={onClick}
		className="bg-gray-500 py-1 px-2 font-bold text-sm cursor-pointer"
	>
		Reload data
	</button>)
}