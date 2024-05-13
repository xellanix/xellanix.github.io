import { m } from "framer-motion";

export default function NavItemSection({
	layout,
	additionalClass,
	sectionName,
	children,
	...otherProps
}) {
	return (
		<div
			id={`${sectionName}-section`}
			className="wrapper-only"
			data-lenis-scroll-to-offset
		>
			<m.section
				className={`${layout}-layout ${additionalClass}`}
				data-insert-to-navbar-menu
				data-affect-to-navbar-menu={`${sectionName}-section`}
				{...otherProps}
			>
				{children}
			</m.section>
		</div>
	);
}
