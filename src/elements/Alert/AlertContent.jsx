import theme from "@styles/theme";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import things from "@static/things.png";
import DataContext from "@contexts/Data/DataContext";

const Wrapper = styled.div`
	position: absolute;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
`;

const Container = styled.div`
	position: absolute;
	display: flex;
	top: 0;
	margin: 1rem;
	background: ${theme.containerBg};
	min-height: 5rem;
	width: 25rem;
	border-radius: 1rem;
	box-shadow: rgba(14, 30, 37, 0.2) 0px 0px 10px 0px,
		inset rgba(207, 229, 255, 0.2) 1px 1px 5px 0px;
	font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
		Roboto, "Helvetica Neue", Arial, sans-serif;
	right: -30rem;
	cursor: default;
	transition: right 0.7s cubic-bezier(0.64, -0.5, 0.16, 1);
	user-select: none;
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	z-index: 5;
	.hidden {
		opacity: 0;
		transition: opacity 0.15s;
	}
	.shown {
		opacity: 1;
		transition: opacity 0.15s;
	}
	@media (max-width: 1224px) {
		width: 91%;
	}
`;

const Close = styled.div`
	position: absolute;
	top: -0.5rem;
	left: -0.5rem;
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 50rem;
	background: ${theme.btnBg};
	box-shadow: rgba(14, 30, 37, 0.1) 0px 2px 4px 0px,
		rgba(14, 30, 37, 0.2) 0px 0px 4px 0px,
		inset rgba(207, 229, 255, 0.2) 1px 1px 5px 0px;
	cursor: pointer;
	user-select: none;
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	&:after {
		content: "\\00d7";
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 1.75rem;
		color: rgba(88, 90, 92, 0.8);
		line-height: 0.825;
	}
`;

const Content = styled.div`
	width: 100%;
	padding: 0 0.75rem;
`;

const Header = styled.div`
	width: 100%;
	display: flex;
	margin: 0.75rem 0 0 0;
	color: rgba(7, 24, 46, 1);
`;

const Icon = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	background: url("${props => props.image && props.image}") no-repeat;
	background-size: contain;
`;

const Title = styled.div`
	padding: 0 0.4rem;
`;

const Time = styled.div`
	margin-left: auto;
	font-size: 1rem;
	padding-right: 0.25rem;
`;

const ContentBody = styled.div`
	color: rgba(7, 24, 46, 1);
	padding: 0.5rem 0 1rem;
	font-weight: 600;
`;

const AlertContent = ({ type }) => {
	const [textContent, setTextContent] = useState("");
	const [time, setTime] = useState("now");
	const { alertHidden, setAlertHidden } = useContext(DataContext);
	const [source, setSource] = useState(null);
	const closeRef = useRef();
	const containerRef = useRef();
	useEffect(() => {
		switch (type) {
			case "hideHelp":
				setTextContent("Type help to get started & act like you're in a terminal!");
				break;
			case "qemu":
				setTextContent(
					"This page is still under development! You might experience visual glitches, ROM issues, etc. On top of that, since it downloads a 16.8 mb OS image, it might take a while to work properly. In such circumstances, try refreshing the page. If you're still having issues, please open an issue on GitHub."
				);
				break;
			default:
				setTextContent("Cannot load alert message!");
				break;
		}

		const img = new Image();
		img.src = things;
		img.onload = () => setSource(things);
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (alertHidden) {
			containerRef.current.classList.remove("showAlert");
			localStorage.setItem(`alert__${type}`, true);
		}
		//eslint-disable-next-line
	}, [alertHidden]);
	useEffect(() => {
		let help = localStorage.getItem(`alert__${type}`);
		if (!help && source && !alertHidden) {
			containerRef.current.classList.add("showAlert");
		}
		//eslint-disable-next-line
	}, [source]);
	useEffect(() => {
		const startTime = new Date();
		let shakeInterval = 15;
		const timer = setInterval(() => {
			let timeSpentSec = Math.floor((new Date() - startTime) / 1000);
			let timeSpentMin = Math.floor(timeSpentSec / 60);
			if (timeSpentMin >= 1) {
				setTime(`${timeSpentMin}m ago`);
			}
			if (timeSpentSec % shakeInterval === 0) {
				containerRef.current.classList.add("shake");
				setTimeout(() => {
					containerRef.current?.classList.remove("shake");
				}, 5000);
			}
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<Wrapper>
			<Container
				ref={containerRef}
				onMouseOver={() => {
					closeRef.current.classList.remove("hidden");
					closeRef.current.classList.add("shown");
				}}
				onMouseOut={() => {
					closeRef.current.classList.add("hidden");
					closeRef.current.classList.remove("shown");
				}}
			>
				<Close
					className="hidden"
					ref={closeRef}
					onClick={() => {
						setAlertHidden(true);
					}}
				/>
				<Content>
					<Header>
						<Icon image={source} />
						<Title>NOTIFICATION</Title>
						<Time>{time}</Time>
					</Header>
					<ContentBody>{textContent}</ContentBody>
				</Content>
			</Container>
		</Wrapper>
	);
};

export default AlertContent;
