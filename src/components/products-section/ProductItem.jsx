import AccentButton from "../button/AccentButton.jsx";
import "./product-item.css";

export default function ProductItem({ title, description, learnLink }) {
	return (
		<div className="product-item">
			<h3>{title}</h3>
			<p>{description}</p>
			<AccentButton href={learnLink} target="_blank" isTabStop={false}>
				Learn More
			</AccentButton>
		</div>
	);
}
