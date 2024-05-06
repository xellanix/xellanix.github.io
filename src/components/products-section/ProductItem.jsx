import AccentButton from "../button/AccentButton.jsx";
import { m } from "framer-motion";

import "./product-item.css";

export default function ProductItem({
	additionalClass,
	title,
	description,
	learnLink,
	icon,
	...otherProps
}) {
	return (
		<m.div className={`product-item ${additionalClass}`} {...otherProps}>
			<div
				className="product-item-icon"
				style={{
					backgroundImage: `url(${icon})`,
				}}
			/>
			<h3>{title}</h3>
			<p>{description}</p>
			<AccentButton href={learnLink} target="_blank" isTabStop={false}>
				Learn More
			</AccentButton>
		</m.div>
	);
}
