import React from "react";
import icon from "../../assets/icon.svg";
import Hamburger from "./Hamburger.jsx";
import NavItem from "../nav-item/NavItem.jsx";
import { GetAllSectionID } from "../nav-item-section/SectionCollector.jsx";
import { v4 as uuidv4 } from "uuid";
import "./Header.css";
import "./nav-styles.css";

function changeSelectedNavItem() {
	function getLastVisibleSection(scrollDirection = 0) {
		let lastVisibleSection = null;
		let lastVisibleSectionTop = 0;

		document
			.querySelectorAll("main > section[data-affect-to-navbar-menu]")
			.forEach((section) => {
				function getByDirection(topr, bottomr) {
					const sectionHeight = bottomr - topr;
					const minVisibleHeight =
						section.dataset.affectToNavbarMenu ===
						"products-section"
							? 0.5
							: 0.3;
					const visibleThreshold = sectionHeight * minVisibleHeight;

					//(topr >= 0 && bottomr - visibleThreshold <= window.innerHeight)
					const isVisible =
						topr + visibleThreshold <= window.innerHeight &&
						bottomr >= visibleThreshold;

					if (
						isVisible &&
						(topr >= lastVisibleSectionTop ||
							lastVisibleSection === null)
					) {
						lastVisibleSectionTop = topr;
						lastVisibleSection = section;
					}
				}

				const rect = section.getBoundingClientRect();
				getByDirection(rect.top, rect.bottom);
				if (scrollDirection === 0)
					getByDirection(rect.top, rect.bottom);
				if (scrollDirection === 1)
					getByDirection(rect.bottom, rect.top);
			});

		return lastVisibleSection;
	}

	function setStyleToNavBarItem(scrollDirection = 0) {
		const lastVisibleSection = getLastVisibleSection(scrollDirection);

		if (lastVisibleSection) {
			const id = lastVisibleSection.dataset.affectToNavbarMenu;
			document
				.querySelectorAll(`.nav-item-wrapper`)
				.forEach((element) => {
					element.classList.remove("active");
				});

			const elem = document.querySelector(
				`.nav-item-wrapper.${id}-class`
			);
			if (elem) elem.classList.add("active");
		}
	}

	let lastScrollTop = 0;

	window.addEventListener("load", function (e) {
		setStyleToNavBarItem();

		if (window.location.hash)
			document
				.querySelector(`a[href="${window.location.hash}"]`)
				?.click();
	});
	window.addEventListener("scroll", function (e) {
		const st = window.scrollY;

		if (st > lastScrollTop) {
			// Downscroll code
			setStyleToNavBarItem(0);
		} else {
			// Upscroll code
			setStyleToNavBarItem(1);
		}

		lastScrollTop = st;
	});
}

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSticky: false,
			isHambarOpened: false,
			navItems: null,
		};
		this.ref = React.createRef();
	}

	componentDidMount() {
		const observer = new IntersectionObserver(([entry]) => {
			this.setState({ isSticky: !entry.isIntersecting });
		});
		observer.observe(this.ref.current);
		this.observer = observer;

		this.setState({ navItems: GetAllSectionID() });

		window
			.matchMedia("(max-width: 820px)")
			.addEventListener("change", (e) =>
				this.setState(
					(prevState) => ({
						isHambarOpened: prevState.isHambarOpened && e.matches,
					}),
					this.isHambarOpenedChanged
				)
			);

		changeSelectedNavItem();
	}

	componentWillUnmount() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}

	handleClick = () => {
		this.setState(
			(prevState) => ({
				isHambarOpened: !prevState.isHambarOpened,
			}),
			this.isHambarOpenedChanged
		);
	};

	isHambarOpenedChanged = () => {
		const { isHambarOpened } = this.state;

		if (isHambarOpened)
			document.querySelector("html").classList.add("no-scroll");
		else document.querySelector("html").classList.remove("no-scroll");
	};

	render() {
		const { isSticky, isHambarOpened, navItems } = this.state;

		return (
			<>
				<div
					ref={this.ref}
					id="header-stick-watcher"
					data-scroll-watcher
				></div>
				<header
					className={`${isSticky ? "on-stick" : ""} ${
						isHambarOpened ? "hambar-opened" : ""
					}`}
				>
					<div className="icon-landscape">
						<a href="" tabIndex="-1">
							<img src={icon} alt="Xellanix Icon" />
							<div>Xellanix</div>
						</a>
					</div>
					<nav>
						{navItems?.map((item) => (
							<NavItem
								key={uuidv4()}
								sectionName={item}
								isUsingHambar={isHambarOpened}
							/>
						))}
					</nav>
					<Hamburger hambarClick={this.handleClick} />
				</header>
			</>
		);
	}
}
