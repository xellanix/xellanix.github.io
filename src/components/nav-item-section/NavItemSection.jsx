import { m } from "framer-motion";

export default function NavItemSection({
	layout,
	additionalClass,
	sectionName,
	children,
	...otherProps
}) {
	return (
		<m.section
			className={`${layout}-layout ${additionalClass}`}
			id={`${sectionName}-section`}
			data-insert-to-navbar-menu
			data-affect-to-navbar-menu={`${sectionName}-section`}
			{...otherProps}
		>
			{children}
		</m.section>
	);
}
