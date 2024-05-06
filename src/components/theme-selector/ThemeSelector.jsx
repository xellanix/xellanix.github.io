import { Component } from "react";
import { IconChevronDown, IconSun, IconMoon } from "@tabler/icons-react";

export default class ThemeSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			useDarkMode: false,
		};
	}

	componentDidMount() {
		this.setState(
			{
				useDarkMode: localStorage.getItem("view-theme") === "1",
			},
			() => {
				this.themeChanged(false);
			}
		);
	}

	handleSelectButton = () => {
		this.setState(
			(prevState) => ({
				useDarkMode: !prevState.useDarkMode,
			}),
			this.themeChanged
		);
	};

	themeChanged = (requireToSave = true) => {
		const { useDarkMode } = this.state;

		if (useDarkMode) {
			document.body.classList.remove("light-theme");
			document.body.classList.add("dark-theme");
		} else {
			document.body.classList.remove("dark-theme");
			document.body.classList.add("light-theme");
		}

		if (requireToSave)
			localStorage.setItem("view-theme", useDarkMode ? "1" : "0");
	};

	render() {
		const { useDarkMode } = this.state;
		return (
			<>
				<button
					className="button"
					style={{
						alignSelf: "stretch",
						padding:
							"calc(var(--button-padding-vertical) * 0.75) calc(var(--button-padding-horizontal) * 0.75)",
						borderRadius:
							"calc(var(--button-border-radius) * 0.75)",
						justifyContent: "flex-start",
					}}
					type="button"
					tabIndex="-1"
					onClick={this.handleSelectButton}
				>
					{useDarkMode && (
						<>
							<IconMoon />
							<span>Dark mode</span>
						</>
					)}
					{!useDarkMode && (
						<>
							<IconSun />
							<span>Light mode</span>
						</>
					)}
				</button>
			</>
		);
	}
}
