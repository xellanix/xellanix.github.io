import { useLenis } from "lenis/react";
import { dqs } from "../../shared.jsx";
import { MakeSectionDataFromID } from "../nav-item-section/SectionCollector.jsx";

export default function NavItem(props) {
	const { id, itemName } = MakeSectionDataFromID(props.sectionName);
	const anchorRef = `#${id}-section`;

	const lenis = useLenis((lenis) => {}, [anchorRef]);

	function handleClick() {
		lenis.scrollTo(anchorRef, { lock: true, force: true });

		if (props.isUsingHambar) {
			dqs("#hamburger-button-lottie #animation").click();
		}
	}

	return (
		<div className={`nav-item-wrapper ${id}-section-class`}>
			<div className="nav-item-indicator"></div>
			<a href={anchorRef} onClick={handleClick}>
				{itemName}
			</a>
		</div>
	);
}
