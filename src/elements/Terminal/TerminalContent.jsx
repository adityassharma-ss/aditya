import React, { useContext, useEffect, useRef, useState } from "react";
// eslint-disable-next-line
import styled, { css, keyframes } from "styled-components";
import DataContext from "@contexts/Data/DataContext";
import theme from "@styles/theme";
import getResponse from "@utils/responseFetcher";
import { sanitize } from "dompurify";
import BodyContent from "@elements/Window/BodyContent";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

const Wrapper = styled(SimpleBarReact)`
	font-family: "Hack", monospace;
	color: ${theme.bodyFont1};
	.simplebar-scrollbar:before {
		border-radius: 10px;
		background-color: ${theme.scrollbarThumb};
	}
	padding: 0.2rem 0.4rem 0 0.4rem;
	line-height: 1.5;
	width: 100%;
	max-height: 80vh;
	overflow-x: hidden;
`;

//eslint-disable-next-line
const Line = styled(SimpleBarReact)`
	// white-space: pre;
	overflow: auto;
	.simplebar-scrollbar:before {
		border-radius: 10px;
		background-color: ${theme.scrollbarThumb};
	}
	// &::-webkit-scrollbar-track {
	// 	border-radius: 10px;
	// 	background-color: inherit;
	// }

	// &::-webkit-scrollbar {
	// 	width: 0.1rem;
	// 	height: 0.5rem;
	// 	background-color: inherit;
	// }

	// &::-webkit-scrollbar-thumb {
	// 	border-radius: 10px;
	// 	background-color: ${theme.scrollbarThumb};
	// }
`;

const Input = styled.input`
	font-family: inherit;
	background: inherit;
	font-size: inherit;
	color: inherit;
	border: none;
	outline: none;
	caret-color: transparent;
	width: 0;
	max-width: 100ch;
	&::selection {
		color: ${theme.bodyBg};
		background: ${theme.bodyBg.negate()};
	}
`;

const InputContainer = styled.span`
	display: flex;
`;

const blink = keyframes`
	from, to {
		background: ${theme.bodyFont1};
	}

	50% {
		background: transparent;
	}
`;

const typingMixin = css`
	animation: ${blink} 1s step-end infinite;
`;

const Cursor = styled.div`
	display: ${props => (props.disabled ? `none` : `auto`)};
	width: 1ch;
	background: ${theme.bodyFont1};
	margin: 0.1rem 0.3rem;
	z-index: 2;
	${props => !props.typing && typingMixin}
`;

const Label = styled.label`
	color: ${theme.labelColor};
`;

const InputLine = props => {
	const [val, setVal] = useState("");
	const { commands, setCommand, path } = useContext(DataContext);
	const [counter, setCounter] = useState(commands.length);
	const [typing, setTyping] = useState(false);
	// eslint-disable-next-line
	const [disabled, setDisabled] = useState(false);
	const inputRef = useRef();
	const cursorRef = useRef();
	let alertHidden = localStorage.getItem("hideHelp");
	useEffect(() => {
		if (!disabled) {
			inputRef.current.focus();
			inputRef.current.addEventListener("select", e => {
				e.target.selectionStart = e.target.selectionEnd;
			});
			inputRef.current.addEventListener("mousedown", e => {
				e.preventDefault();
			});
		}
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!alertHidden) {
			const startTime = new Date();
			const timer = setInterval(() => {
				let timeSpentSec = Math.floor((new Date() - startTime) / 1000);
				let timeSpentMin = Math.floor(timeSpentSec / 60);
				if (timeSpentMin === 5 && !disabled) {
					setVal("help");
					inputRef.current.style.width =
						inputRef.current.value.length + "ch";
				}
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		}
		//eslint-disable-next-line
	}, [disabled, alertHidden]);

	useEffect(() => {
		const timeoutId = setTimeout(() => setTyping(false), 200);
		return () => clearTimeout(timeoutId);
	}, [typing]);
	return (
		<InputContainer>
			<Label
				htmlFor="input"
				dangerouslySetInnerHTML={{
					__html: sanitize(path),
				}}
			/>
			<Input
				id="input"
				type="text"
				ref={inputRef}
				value={val}
				onBlur={e => {
					if (!disabled) {
						e.target.focus();
					}
				}}
				onKeyDown={e => {
					let ctrlCheck = false;
					if (e.ctrlKey) {
						ctrlCheck = true;
					}
					let currentPos = parseFloat(
						cursorRef.current.style.transform.slice(11)
					);
					let textLength = inputRef.current.value.length;
					let checkPos = Math.abs(Math.floor(currentPos));
					switch (e.key) {
						case "ArrowLeft":
							if (checkPos <= textLength && !ctrlCheck) {
								setTyping(true);
								cursorRef.current.style.transform = `translateX(${
									currentPos - 1
								}ch)`;
							} else {
								e.preventDefault();
							}
							break;
						case "Delete":
							if (checkPos !== 1 && !ctrlCheck) {
								cursorRef.current.style.transform = `translateX(${
									currentPos + 1
								}ch)`;
							} else {
								e.preventDefault();
							}
							break;
						case "Home":
							if (checkPos <= textLength) {
								cursorRef.current.style.transform = `translateX(${
									-textLength - 0.5
								}ch)`;
							} else {
								e.preventDefault();
							}
							break;
						case "End":
							if (checkPos !== 1) {
								cursorRef.current.style.transform = `translateX(-0.5ch)`;
							} else {
								e.preventDefault();
							}
							break;
						case "ArrowRight":
							if (checkPos !== 1 && !ctrlCheck) {
								setTyping(true);
								cursorRef.current.style.transform = `translateX(${
									currentPos + 1
								}ch)`;
							} else {
								e.preventDefault();
							}
							break;
						case "ArrowUp":
							if (counter > 0) {
								setCounter(counter - 1);
								let currentCommand = commands[counter - 1];
								setVal(currentCommand);
								e.target.style.width =
									currentCommand.length + "ch";
								cursorRef.current.style.transform = `translateX(${
									-currentCommand.length - 0.5
								}ch)`;
							}
							break;
						case "ArrowDown":
							if (counter <= commands.length - 1) {
								if (counter === commands.length - 1) {
									setVal("");
									e.target.style.width = "0ch";
									cursorRef.current.style.transform = `translateX(-0.5ch)`;
								} else {
									setCounter(counter + 1);
									let currentCommand = commands[counter + 1];
									setVal(currentCommand);
									e.target.style.width =
										currentCommand.length + "ch";
									cursorRef.current.style.transform = `translateX(${
										-currentCommand.length - 0.5
									}ch)`;
								}
							}
							break;
						case "Enter":
							setDisabled(true);
							props.setData(val);
							props.setChild(props.child + 1);
							setCommand(val);
							break;
						default:
							// console.log(e.key)
							break;
					}
				}}
				onChange={e => {
					e.preventDefault();
					if (e.target.value.length <= 100) {
						setVal(e.target.value.toLowerCase());
						setTyping(true);
						e.target.style.width = e.target.value.length + "ch";
					}
				}}
				spellCheck={false}
				autoComplete="off"
				autoCorrect="off"
			/>
			<Cursor
				ref={cursorRef}
				typing={typing}
				disabled={disabled}
				style={{
					transform: "translateX(-0.5ch)",
				}}
			/>
		</InputContainer>
	);
};

const Response = props => {
	return <Line>{props.content}</Line>;
};

const Command = props => {
	const [response, setResponse] = useState("");
	const [data, setData] = useState("");
	useEffect(() => {
		if (data.length) {
			if (data.trim().toLowerCase() === "clear") {
				props.setActive(false);
				props.setChild(1);
			}
			let res = getResponse(data.trim());
			setResponse(res);
		}
	}, [data, props]);
	return (
		<Wrapper>
			<InputLine
				setChild={props.setChild}
				child={props.child}
				setData={setData}
				path={props.path}
			/>
			<Response content={response} />
		</Wrapper>
	);
};

const TerminalContent = () => {
	const [child, setChild] = useState(1);
	const [active, setActive] = useState(true);
	useEffect(() => {
		setActive(true);
	}, [active]);
	return (
		<BodyContent>
			<Wrapper>
				{Array.from(Array(child).keys()).map(i => (
					<Command
						setChild={setChild}
						setActive={setActive}
						child={child}
						key={i === 0 ? active && i : i}
					/>
				))}
			</Wrapper>
		</BodyContent>
	);
};

export default TerminalContent;
