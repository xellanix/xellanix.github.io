import { substringTo, toCapitalizeEachWord } from "../../shared.jsx";

export function GetAllSectionID() {
	return [
		...document.querySelectorAll(
			"main > section[data-insert-to-navbar-menu]"
		),
	].map((element) => {
		return element.id;
	});

	// [...new Set(this.navItems)]
}

export function GetSubSectionID(sectionID = "") {
	const id = substringTo(sectionID, "-section");

	return id;
}

export function GetSectionName(sectionID = "") {
	return MakeSectionDataFromID(sectionID).itemName;
}

export function MakeSectionDataFromID(sectionID = "") {
	const id = GetSubSectionID(sectionID);
	const itemName = toCapitalizeEachWord(id, "-");

	return { id, itemName };
}
