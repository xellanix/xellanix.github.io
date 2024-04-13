import React from "react";
import {
	GetAllSectionID,
	GetSectionName,
	GetSubSectionID,
	MakeSectionDataFromID,
} from "../nav-item-section/SectionCollector.jsx";
import { v4 as uuidv4 } from "uuid";

export default class LinkSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sectionItems: null,
		};
	}

	componentDidMount() {
		this.setState({ sectionItems: GetAllSectionID() });
	}

	render() {
		const { sectionItems } = this.state;
		let renderContainer = false; //By default don't render anything

		if (sectionItems) {
			//If this.state.render == true, which is set to true by the timer.
			renderContainer = (
				<>
					{sectionItems.map((item) => (
						<a
							key={uuidv4()}
							href={`#${GetSubSectionID(item)}-section`}
							target="_blank"
						>
							{GetSectionName(item)}
						</a>
					))}
				</>
			); //Add dom elements
		}

		return renderContainer; //Render the dom elements, or, when this.state == false, nothing.
	}
}
