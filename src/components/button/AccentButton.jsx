import "./accent-button.css";

export default function AccentButton(props) {
	return (
		<div className="accent-button">
			<a
				href={props.href}
				target={props.target}
				tabIndex={!props.isTabStop ? -1 : undefined}
				//{...(props.isTabStop ? { tabIndex: -1 } : {})}
			>
				{props.children}
			</a>
		</div>
	);
}
