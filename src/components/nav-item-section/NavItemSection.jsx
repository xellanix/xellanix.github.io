export default function NavItemSection(props) {
	return (
		<section
			className={`${props.layout}-layout ${props.additionalClass}`}
			id={`${props.sectionName}-section`}
			data-insert-to-navbar-menu
			data-affect-to-navbar-menu={`${props.sectionName}-section`}
		>
			{props.children}
		</section>
	);
}
