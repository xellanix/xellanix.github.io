import { m } from "framer-motion";

import "./team-member-item.css";

export default function TeamMemberItem({
	additionalClass,
	imgSrc,
	name,
	role,
	...otherProps
}) {
	return (
		<m.div
			className={`team-member-item ${additionalClass}`}
			{...otherProps}
		>
			<img src={imgSrc} alt={`${name} Picture`} />
			<div className="vertical-layout">
				<h3>{name}</h3>
				<p>{role}</p>
			</div>
		</m.div>
	);
}
