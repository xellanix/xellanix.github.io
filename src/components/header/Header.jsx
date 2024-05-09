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

function changeSelectedNavItem() {
	function getLastVisibleSection(scrollDirection = 0) {
		let lastVisibleSection = null;
		let lastVisibleSectionTop = 0;

		dqsa("main > section[data-affect-to-navbar-menu]").forEach(
			(section) => {
				function getByDirection(topr, bottomr) {
					const sectionHeight = bottomr - topr;
					const minVisibleHeight =
						section.dataset.affectToNavbarMenu ===
						"products-section"
							? 0.5
							: 0.4;
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
			}
		);

		return lastVisibleSection;
	}

	function setStyleToNavBarItem(scrollDirection = 0) {
		const lastVisibleSection = getLastVisibleSection(scrollDirection);

		if (lastVisibleSection) {
			const id = lastVisibleSection.dataset.affectToNavbarMenu;
			dqsa(`.nav-item-wrapper`).forEach((element) => {
				element.removeClasses("active");
			});

			dqs(`.nav-item-wrapper.${id}-class`)?.addClasses("active");
		}
	}

	let lastScrollTop = 0;

	window.addEventListener("load", function (e) {
		setStyleToNavBarItem();

		if (window.location.hash)
			dqs(`a[href="${window.location.hash}"]`)?.click();
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

export default function Header({
	isCollapsed,
	mediaQuery = window.matchMedia("(max-width: 820px)"),
	children,
}) {
	const [isSticky, setIsSticky] = useState(false);
	const [isHambarOpened, setIsHambarOpened] = useState(false);
	const [navItems, setNavItems] = useState(null);
	const ref = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsSticky(!entry.isIntersecting);
		});
		observer.observe(ref.current);

		setNavItems(GetAllSectionID());

		mediaQuery.addEventListener("change", (e) => {
			if (isHambarOpened)
				dqs("#hamburger-button-lottie #animation").click();

			setIsHambarOpened(isHambarOpened && e.matches);
		});

		changeSelectedNavItem();

		return () => {
			observer?.disconnect();
		};
	}, []);

	function handleClick() {
		if (isCollapsed) {
			setIsHambarOpened(!isHambarOpened);
		}
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
				<nav data-lenis-prevent>
					{navItems?.map((item) => (
						<NavItem
							key={uuidv4()}
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
