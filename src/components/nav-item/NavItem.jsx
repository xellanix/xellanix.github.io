import { MakeSectionDataFromID } from "../nav-item-section/SectionCollector.jsx";

export default function NavItem(props) {
	const { id, itemName } = MakeSectionDataFromID(props.sectionName);

	function handleClick() {
		//$("#hamburger-button-lottie").trigger("click");
		if (props.isUsingHambar) {
			document
				.querySelector("#hamburger-button-lottie #animation")
				.click();
		}
	}

	return (
		<div className={`nav-item-wrapper ${id}-section-class`}>
			<a href={`#${id}-section`} onClick={handleClick}>
				{itemName}
			</a>
		</div>
	);
}
