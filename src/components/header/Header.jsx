import React, { useState, useRef, useEffect } from "react";
import Hamburger from "./Hamburger.jsx";
import NavItem from "../nav-item/NavItem.jsx";
import { GetAllSectionID } from "../nav-item-section/SectionCollector.jsx";
import { v4 as uuidv4 } from "uuid";
import { useLenis } from "lenis/react";
import { dqs, dqsa } from "../../shared.jsx";

import icon from "../../assets/icon.svg";
import "./Header.css";
import "./nav-styles.css";

function getAllNavItems(callback = (active = "") => {}) {
	let actives = [];
	const observer = new IntersectionObserver(
		([entry]) => {
			const id = entry.target.dataset.affectToNavbarMenu;
			const activeIndex = actives.indexOf(id);

			if (entry.isIntersecting) {
				if (activeIndex === -1) {
					actives.push(id);

					callback(id);
				}
			} else {
				if (actives.length > 1) {
					if (activeIndex !== -1) {
						actives.splice(activeIndex, 1);

						callback(actives.slice(-1)[0]);
					}
				}
			}
		},
		{ threshold: 0.5 }
	);

	dqsa("main section[data-affect-to-navbar-menu]").forEach((section) => {
		observer.observe(section);
	});

	return observer;
}

export default function Header({
	isCollapsed,
	mediaQuery = window.matchMedia("(max-width: 820px)"),
	children,
}) {
	const [isSticky, setIsSticky] = useState(false);
	const [isHambarOpened, setIsHambarOpened] = useState(false);
	const [navItems, setNavItems] = useState(null);
	const [activeNav, setActiveNav] = useState("");
	const ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsSticky(!entry.isIntersecting);
		});
		observer.observe(ref.current);

		setNavItems(GetAllSectionID());

		mediaQuery.addEventListener("change", (e) => {
			if (isHambarOpened) dqs("#hamburger-button-lottie #animation").click();

			setIsHambarOpened(isHambarOpened && e.matches);
		});

		const navigationObserver = getAllNavItems((active) => setActiveNav(active));

		return () => {
			observer?.disconnect();
			navigationObserver?.disconnect();
		};
	}, []);

	function handleClick() {
		if (isCollapsed) setIsHambarOpened(!isHambarOpened);
	}

	useLenis(
		(lenis) => {
			if (isHambarOpened) {
				dqs("html").addClasses("no-scroll");
				lenis.stop();
			} else {
				dqs("html").removeClasses("no-scroll");
				lenis.start();
			}
		},
		[isHambarOpened]
	);

	return (
		<>
			<div ref={ref} id="header-stick-watcher" data-scroll-watcher></div>
			<header className={`${isSticky && "on-stick"}${isHambarOpened && "hambar-opened"}`}>
				<div className="icon-landscape">
					<a href="" tabIndex="-1">
						<img src={icon} alt="Xellanix Icon" />
						<div>Xellanix</div>
					</a>
				</div>
				<nav data-lenis-prevent>
					{navItems?.map((item) => (
						<NavItem
							key={uuidv4()}
							isActive={item === activeNav}
							sectionName={item}
							isUsingHambar={isHambarOpened}
						/>
					))}
				</nav>
				{children}
				{isCollapsed && <Hamburger hambarClick={handleClick} />}
			</header>
		</>
	);
}
