import { create } from "@lottiefiles/lottie-interactivity";
import "@lottiefiles/lottie-player";
import React from "react";

class Hamburger extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef(); // 1. create a reference for the lottie player
	}

	componentDidMount() {
		// 3. listen for player load. see lottie player repo for other events
		this.myRef.current.addEventListener("load", function (e) {
			// 4. configure the interactivity library
			create({
				player: "#hamburger-button-lottie",
				mode: "cursor",
				actions: [{ type: "toggle" }],
			});
		});
	}

	render() {
		return (
			<div className="hamburger-button" id="navigation-small-hamburger">
				<lottie-player
					ref={this.myRef} // 2. set the reference for the player
					id="hamburger-button-lottie"
					src="/hamburger.json"
					style={{ width: "40px", height: "40px" }}
					disableShadowDOM
					onClick={this.props.hambarClick}
				></lottie-player>
			</div>
		);
	}
}

export default Hamburger;
