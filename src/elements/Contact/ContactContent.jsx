import React from "react";
import styled from "styled-components";
import theme from "@styles/theme";

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	max-width: 100%;
	height: 100%;
	border-radius: 0 0 0.6rem 0.6rem;
	border: 1px solid ${theme.bodyBorder};
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	position: relative;
	width: clamp(20rem, 30rem, 85vw);
`;

const MainSection = styled.ol`
	list-style: none;
	padding: 0.5rem;
	font-size: 1rem;

	background: rgba(32, 33, 39, 0.25);
	box-shadow: inset 0 0 0.1em rgb(255 255 255 / 50%);
	border: solid 1px rgba(40, 40, 40, 0.175);
	border-radius: 0.5rem;
	margin: 1.25rem 1rem;
	a {
		color: #c9cbdb;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	li {
		padding: 0.25rem 0.75rem;
		cursor: pointer;
		display: flex;
		border-radius: 0.25rem;
	}
	li:not(:last-child) {
		margin-bottom: 0.5rem;
	}
	li:hover,
	li:active {
		background: #2a69c2;
		& a {
			color: #fff;
		}
		svg {
			color: rgb(255, 255, 255, 1);
		}
	}
	svg {
		display: inline;
		color: rgb(255, 255, 255, 0.15);
	}
	span {
		vertical-align: baseline;
		font-weight: 600;
	}
`;

const ResumeContent = () => {
	return (
		<Wrapper>
			<Container>
				<MainSection>
					<li>
						<a
							href="https://twitter.com/aadityatwt"
							target="_blank"
							rel="noreferrer"
						>
							<span>Twitter</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/in/adityasharma23/"
							target="_blank"
							rel="noreferrer"
						>
							<span>LinkedIn</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
							</svg>
						</a>
					</li>
                    <li>
						<a
							href="https://github.com/adityassharma-ss"
							target="_blank"
							rel="noreferrer"
						>
							<span>Github</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="mailto:adityashf7@gmail.com?subject=Hi Aditya!&amp;body=I'm coming from your website, are you up for a chat?"
							target="_blank"
							rel="noreferrer"
						>
							<span>Email</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
							</svg>
						</a>
					</li>
				</MainSection>
			</Container>
		</Wrapper>
	);
};

export default ResumeContent;