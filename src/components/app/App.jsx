import backgroundVisual from "../../assets/bg-custom-shape-1.svg";
import homeVisual from "../../assets/home-1.svg";
import member1Avatar from "../../assets/member/avatar1.jpg";
import member2Avatar from "../../assets/member/avatar2.jpg";
import member3Avatar from "../../assets/member/avatar3.jpg";

import AccentButton from "../button/AccentButton.jsx";
import Header from "../header/Header.jsx";
import NavItemSection from "../nav-item-section/NavItemSection.jsx";
import ProductItem from "../products-section/ProductItem.jsx";
import GetProductItems from "../products-section/ProductItems.jsx";
import LinkSection from "../service-section/LinkSection.jsx";
import ServiceSection from "../service-section/ServiceSection.jsx";
import { v4 as uuidv4 } from "uuid";

export default function App() {
	return (
		<>
			<Header />

			<main>
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
						<img
							src={homeVisual}
							alt="Fast, Simple, and Neat Coding Package Illustration"
						/>
						<AccentButton isTabStop={false}>
							Get Started
						</AccentButton>
					</div>
					<img
						src={homeVisual}
						alt="Fast, Simple, and Neat Coding Package Illustration"
					/>
				</NavItemSection>

				<section
					className="horizontal-layout"
					id="more-about-xellanix"
					data-affect-to-navbar-menu="home-section"
				>
					<div
						className="vertical-layout flex-fill text-align-justify"
						style={{ flex: "4 1 0" }}
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
					</div>
					<div
						className="vertical-layout text-align-justify flex-fill"
						style={{ flex: "6 1 0" }}
					>
						<div className="vertical-layout flex-fill">
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
						</div>
						<div
							className="vertical-layout flex-fill"
							style={{ marginTop: "var(--section-gap-vertical)" }}
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
						</div>
					</div>
				</section>

				<NavItemSection
					additionalClass="text-align-center horizontal-layout-center-align"
					sectionName="products"
					layout="vertical"
				>
					<img src={backgroundVisual} alt="" />
					<h2>Explore All the Works You've Never Imagined Before</h2>
					<div className="horizontal-layout vertical-layout-center-align">
						{GetProductItems()?.map(
							({ title, description, laernLink }) => (
								<ProductItem
									key={uuidv4()}
									title={title}
									description={description}
									laernLink={laernLink}
								/>
							)
						)}
					</div>
				</NavItemSection>

				<NavItemSection
					additionalClass="text-align-center horizontal-layout-center-align"
					sectionName="team"
					layout="vertical"
				>
					<h2>You Are the One Who Builds This Community</h2>
					<p>
						“We build this community with you, as by doing so,
						<br />
						there is great hope for ongoing growth.”
					</p>
					<div className="horizontal-layout vertical-layout-center-align">
						<div className="team-member-item">
							<img
								src={member1Avatar}
								alt="Donny Andrian Picture"
							/>
							<div className="vertical-layout vertical-layout-center-align">
								<h3>Donny Andrian</h3>
								<p>President of Xellanix</p>
							</div>
						</div>
						<div className="team-member-item">
							<img
								src={member2Avatar}
								alt="Jenie Josphin Picture"
							/>
							<div className="vertical-layout vertical-layout-center-align">
								<h3>Jenie Josphin</h3>
								<p>Creative Director</p>
							</div>
						</div>
						<div className="team-member-item">
							<img src={member3Avatar} alt="Bernardo Picture" />
							<div className="vertical-layout vertical-layout-center-align">
								<h3>Bernardo Ng</h3>
								<p>Full Stack Developer</p>
							</div>
						</div>
					</div>
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
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.75"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
								</svg>
							</a>
						</div>
					</div>
					<div className="horizontal-layout gap-15">
						<ServiceSection title="Link">
							<LinkSection></LinkSection>
						</ServiceSection>
						<ServiceSection
							title="Product"
							items={GetProductItems()?.map(
								({ title, laernLink }) => {
									return { content: title, link: laernLink };
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
							></iframe>
						</ServiceSection>
					</div>
				</NavItemSection>
			</main>

			<div id="smoke-layer"></div>
		</>
	);
}
