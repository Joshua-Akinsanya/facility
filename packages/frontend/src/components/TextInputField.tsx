import { type InputHTMLAttributes } from "react"

interface TextInputFieldProps {
	type?: string
	name?: string
	id?: string
	placeholder?: string
	value?: string | number
	required?: boolean
	className?: string
	onChange?: () => void
}

export default function TextInputField(
	{ 
		type="text", 
		name="", 
		id="", 
		placeholder="", 
		value, 
		required=false,
		className="",
		onChange= () => {}
	}: InputHTMLAttributes<TextInputFieldProps>

){
	return (
		<input
			type={type}
			name={name}
			id={id}
			className={`block w-full border px-2 py-1 outline-none ${className}`}
			placeholder={placeholder}
			value={value}
			required={required}
			onChange={onChange}
		/>
	)
}