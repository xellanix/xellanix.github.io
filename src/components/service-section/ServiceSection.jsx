import { v4 as uuidv4 } from "uuid";

export default function ServiceSection({ title, items, children }) {
	return (
		<div className="vertical-layout">
			<h4>{title}</h4>
			{items?.map(({ content, link }) => (
				<a key={uuidv4()} href={link} target="_blank" tabIndex="-1">
					{content}
				</a>
			))}
			{children}
		</div>
	);
}
