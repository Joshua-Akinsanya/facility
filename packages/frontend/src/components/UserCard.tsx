import { type UserInfo } from "@facility-management/shared"

interface UserCardProps {
	user: UserInfo
}

export default function UserCard({ user }: UserCardProps){
	return (
		<div
			className="max-w-100 border-2 border-neutral-100 p-4 space-y-4"
		>
			<h2
				className="text-xl font-bold"
			>
				{user.username}
			</h2>
			<div
				className="space-y-1"
			>
				<p
					className="text-neutral-400"
				>
					{user.email}
				</p>
				<p
					className="text-neutral-400"
				>
					Type: {user.role}
				</p>
			</div>
		</div>
	)
}