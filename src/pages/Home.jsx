import backgroundVisual from "../assets/bg-custom-shape-1.svg";
import homeVisual from "../assets/home-1.svg";

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLenis } from "lenis/react";
import { m, useTransform } from "framer-motion";
import { IconBrandGithub } from "@tabler/icons-react";

import AccentButton from "../components/button/AccentButton.jsx";
import Header from "../components/header/Header.jsx";
import NavItemSection from "../components/nav-item-section/NavItemSection.jsx";
import ProductItem from "../components/products-section/ProductItem.jsx";
import GetProductItems from "../components/products-section/ProductItems.jsx";
import LinkSection from "../components/service-section/LinkSection.jsx";
import ServiceSection from "../components/service-section/ServiceSection.jsx";
import PopupSection from "../components/popup-section/PopupSection.jsx";
import SignInPopup from "../components/auth/SignInPopup.jsx";
import SignInOthers from "../components/auth/SignInOthers.jsx";
import SignUpPopup from "../components/auth/SignUpPopup.jsx";
import ThemeSelector from "../components/theme-selector/ThemeSelector.jsx";
import TeamMemberItem from "../components/team-member/TeamMemberItem.jsx";
import GetMembers from "../components/team-member/Members.jsx";
import ScrollAnimator, {
	showFromX,
	showFromY,
} from "../components/scroll-trigger/ScrollAnimator.jsx";
import { Splitter, dqs } from "../shared.jsx";
import { signOut } from "../components/auth/auth.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Home() {
	const isCollapsedMatch = window.matchMedia("(max-width: 820px)");
	const [isCollapsed, setIsCollapsed] = useState(isCollapsedMatch.matches);

	const { userLoggedIn, currentUser } = useAuth();

	useEffect(() => {
		isCollapsedMatch.addEventListener("change", (e) => {
			setIsCollapsed(e.matches);
		});

		console.log(
			`Hello ${currentUser?.displayName ?? "null"} (${
				currentUser?.email
			})`
		);
	}, []);

	const [isPopupOpened, setIsPopupOpened] = useState(false);
	const [popupLast, setPopupLast] = useState(null);
	const [popupItem, setPopupItem] = useState(null);

	function openPopup(item = <></>) {
		setIsPopupOpened(true);
		setPopupItem(item);
	}
	useLenis(
		(lenis) => {
			if (isPopupOpened) {
				dqs("html").addClasses("hide-all");
				lenis.stop();
			} else {
				dqs("html").removeClasses("hide-all");
				setPopupItem(null);
				setPopupLast(null);
				lenis.start();
			}
		},
		[isPopupOpened]
	);

	const container = useRef();

	const [productHeaderRes, productHeaderLength] = Splitter(
		"Explore All the Works You've Never Imagined Before",
		{ type: "word" }
	);
	const [productHeaderRef, productHeaderProgress] = ScrollAnimator({
		offset: ["start end", "1.5 0.5"],
		spring: true,
		springOptions: {
			bounce: 0,
		},
	});

	const motionYN = showFromY(-100);
	const motionYP = showFromY(100);
	const motionXN = showFromX(-100);
	const motionXP = showFromX(100);

	function handleBack() {
		openPopup(popupLast);
		setPopupLast(null);
	}
	function openSignInPopup() {
		const rootPopup = (
			<SignInPopup
				switchToSignUp={() =>
					openPopup(
						<SignUpPopup switchToSignIn={() => openSignInPopup()} />
					)
				}
				moveOtherMethods={() => {
					setPopupLast(rootPopup);
					openPopup(<SignInOthers />);
				}}
			/>
		);
		openPopup(rootPopup);
	}

	return (
		<>
			<Header isCollapsed={isCollapsed} mediaQuery={isCollapsedMatch}>
				{userLoggedIn ? (
					<button
						className="button accent"
						type="button"
						onClick={async () => {
							const result = await signOut();
							if (result?.error)
								console.log({
									type: "error",
									message: result?.error,
								});
						}}
					>
						Sign Out
					</button>
				) : (
					<button
						className="button accent"
						type="button"
						onClick={openSignInPopup}
					>
						Sign in
					</button>
				)}
			</Header>

			<main ref={container}>
				<NavItemSection
					sectionName="home"
					layout="horizontal"
					additionalClass="use-space-between"
				>
					<div id="hero-content">
						<h1>
							Provide{" "}
							<span style={{ color: "var(--accent-color)" }}>
								Speed, Simplicity, and Neatness
							</span>{" "}
							in Your Coding Experience
						</h1>
						<h6>
							Build your programming projects faster and easier
							than ever.
						</h6>
						{isCollapsed && (
							<img
								src={homeVisual}
								alt="Fast, Simple, and Neat Coding Package Illustration"
							/>
						)}
						<AccentButton
							isTabStop={false}
							href="#products-section"
							id="get-started-button"
						>
							Get Started
						</AccentButton>
					</div>
					{!isCollapsed && (
						<img
							src={homeVisual}
							alt="Fast, Simple, and Neat Coding Package Illustration"
						/>
					)}
				</NavItemSection>

				<section
					className="horizontal-layout"
					id="more-about-xellanix"
					data-affect-to-navbar-menu="home-section"
				>
					<m.div
						className="vertical-layout flex-fill text-align-justify animate-left-to-in"
						style={{ flex: "4 1 0" }}
						initial={{ opacity: 0, x: -100 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{
							once: false,
							margin: "0px 0px -50% 0px",
						}}
					>
						<h2>About Xellanix Community</h2>
						<p>
							Xellanix Community (2022) is an independent public
							benefit community with the purpose to provide a
							complete, free and open source projects and
							libraries.
							<br />
							We are also established to have a positive impact on
							many people, especially programmers, in utilizing a
							programming language for their projects.
							<br />
							Xellanix continues to strive for relevance in its
							active projects and libraries, aiming to provide
							ongoing convenient and positive feedback regarding
							our development.
						</p>
					</m.div>
					<m.div
						className="vertical-layout text-align-justify flex-fill vertical-gap2x"
						style={{ flex: "6 1 0" }}
						variants={motionXP}
						initial="hidden"
						whileInView="show"
						viewport={{
							once: false,
							margin: "0px 0px -50% 0px",
						}}
					>
						<m.div
							className="vertical-layout flex-fill animate-right-to-in"
							variants={motionXP}
						>
							<h2>Community Purposes</h2>
							<p>
								Our Vision is to provide convenience to everyone
								in working on their projects in specific
								programming languages for free.
								<br />
								As part of our vision, the Xellanix Community
								was formed with mission to offer relevant and
								user-friendly projects and libraries for free.
							</p>
						</m.div>
						<m.div
							className="vertical-layout flex-fill animate-right-to-in"
							variants={motionXP}
						>
							<h2>Our Goals</h2>
							<p>
								Maintain and enhance Xellanix projects and
								libraries through a publicly accessible source
								code system under the MIT License.
								<br />
								Provide researchers and programmers, both
								individuals and teams, access to complete, free
								and open source projects and libraries
							</p>
						</m.div>
					</m.div>
				</section>

				<NavItemSection
					additionalClass="text-align-center flex-align-center"
					sectionName="products"
					layout="vertical"
				>
					<img src={backgroundVisual} alt="" />
					<m.h2 ref={productHeaderRef} className="split-text">
						{productHeaderRes.map((result, i) => {
							const start = i / productHeaderLength;
							const end = start + 1 / productHeaderLength;
							return (
								<Word
									key={uuidv4()}
									range={[start, end]}
									progress={productHeaderProgress}
								>
									{result}
								</Word>
							);
						})}
					</m.h2>
					<m.div
						className="horizontal-container-layout flex-align-center"
						variants={motionYP}
						initial="hidden"
						whileInView="show"
						viewport={{
							once: false,
							margin: "0px 0px -30% 0px",
						}}
					>
						{GetProductItems()?.map(
							({ title, description, learnLink, icon }) => {
								return (
									<ProductItem
										key={uuidv4()}
										title={title}
										description={description}
										learnLink={learnLink}
										icon={icon}
										variants={motionYP}
									/>
								);
							}
						)}
					</m.div>
				</NavItemSection>

				<NavItemSection
					additionalClass="text-align-center flex-align-center"
					sectionName="team"
					layout="vertical"
				>
					<m.div
						className="wrapper-only"
						variants={motionYN}
						initial="hidden"
						whileInView="show"
						viewport={{
							once: false,
							margin: "0px 0px -50% 0px",
						}}
					>
						<m.h2 variants={motionYN}>
							You Are the One Who Builds This Community
						</m.h2>
						<m.p variants={motionYN}>
							“We build this community with you, as by doing so,
							<br />
							there is great hope for ongoing growth.”
						</m.p>
					</m.div>
					<m.div
						className="horizontal-container-layout flex-align-center"
						variants={motionXN}
						initial="hidden"
						whileInView="show"
						viewport={{
							once: false,
							margin: "0px 0px -60% 0px",
						}}
					>
						{GetMembers()?.map(({ name, role, imgSrc }) => (
							<TeamMemberItem
								key={uuidv4()}
								imgSrc={imgSrc}
								name={name}
								role={role}
								variants={motionXN}
							/>
						))}
					</m.div>
				</NavItemSection>

				<NavItemSection
					additionalClass="use-space-between"
					sectionName="service"
					layout="horizontal"
				>
					<div
						className="vertical-layout"
						style={{
							gap: "calc(var(--section-gap-vertical) * 0.75)",
						}}
					>
						<h2 style={{ color: "var(--accent-color)" }}>
							Xellanix
						</h2>
						<h4 style={{ fontWeight: "500" }}>
							Faster and easier than ever.
						</h4>
						<div className="horizontal-layout social-media-links">
							<a
								href="https://github.com/xellanix"
								target="_blank"
								tabIndex="-1"
								title="GitHub Profile"
							>
								<IconBrandGithub size={32} stroke={1.75} />
							</a>
						</div>
						<ThemeSelector />
					</div>
					<div className="horizontal-layout gap-15">
						<ServiceSection title="Link">
							<LinkSection></LinkSection>
						</ServiceSection>
						<ServiceSection
							title="Product"
							items={GetProductItems()?.map(
								({ title, learnLink }) => {
									return {
										content: title,
										link: learnLink,
									};
								}
							)}
						></ServiceSection>
						<ServiceSection
							title="Contact"
							items={[
								{
									content: "donnylabsofficial@gmail.com",
									link: "mailto:donnylabsofficial@gmail.com",
								},
							]}
						>
							<div
								style={{
									fontSize: "var(--navigation-text-size)",
								}}
							>
								Kubu Raya, Kalimantan Barat, Indonesia
							</div>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8159577532433!2d109.36706317495248!3d-0.06235269993703156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59cfb8c87e51%3A0x26f30b0e019e9996!2sService%20Mesin%20Jahit%20Achiung!5e0!3m2!1sen!2sid!4v1712993547014!5m2!1sen!2sid"
								width="300"
								height="175"
								style={{
									border: "0",
									borderRadius: "8px",
									boxShadow:
										"0px 4px 48px 0px rgba(0, 0, 0, .1)",
								}}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Xellanix Operational Location"
							></iframe>
						</ServiceSection>
					</div>
				</NavItemSection>
			</main>

			<div
				id="smoke-layer"
				className="vertical-layout flex-align-middle flex-align-center"
			>
				{isPopupOpened && (
					<PopupSection
						setIsPopupOpened={setIsPopupOpened}
						canBack={!!popupLast}
						backHandle={handleBack}
					>
						{popupItem}
					</PopupSection>
				)}
			</div>
		</>
	);
}

function Word({ range, progress, children }) {
	const opacity = useTransform(progress, range, [0.075, 1]);

	return <m.span style={{ opacity }}>{children}</m.span>;
}
