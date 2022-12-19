import { useContext, useEffect } from "react";
import commands from "@utils/commands";
import styled from "styled-components";
import theme from "@styles/theme";
import { sanitize } from "dompurify";
import DataContext from "@contexts/Data/DataContext";

// eslint-disable-next-line
const Wrapper = styled.span`
	a {
		color: inherit;
		background: inherit;
		text-decoration: none;
	}
	.style1 {
		color: ${theme.bodyFont1};
	}
	.style2 {
		color: ${theme.bodyFont2};
	}
	.style3 {
		color: ${theme.bodyFont2.darken(0.75)};
		background: ${theme.bodyFont1};
	}
	.style4 {
		color: ${theme.bodyFont3};
	}
	.style5 {
		color: ${theme.bodyFont4};
	}
	.style6 {
		color: ${theme.bodyFont5};
	}
	.style7 {
		background: ${theme.easterEgg};
		background-size: 1800% 1800%;
		animation: rainbow 15s ease infinite;

		@keyframes rainbow {
			0% {
				background-position: 0% 82%;
			}
			50% {
				background-position: 100% 19%;
			}
			100% {
				background-position: 0% 82%;
			}
		}
		color: ${theme.bodyFont4};
	}
`;

const getErrorCommand = command => {
	return (
		<Wrapper>
			zsh: command not found:{" "}
			<span className="style2">{sanitize(command)}</span>
		</Wrapper>
	);
};

const Action = props => {
	const { setAlertHidden } = useContext(DataContext);
	useEffect(() => {
		if (props.action) {
			switch (Object.keys(props.action)[0]) {
				case "PATH":
					window.open(props.action.PATH);
					break;
				case "CODE":
					document.location.href = "/vscode";
					break;
				case "DANGER":
					document.location.href = "/danger-zone";
					break;
				case "QEMU":
					document.location.href = "/qemu";
					break;
				case "RESUME":
					document.location.href = "/resume";
					break;
				case "PROJECTS":
					document.location.href = "/projects";
					break;
				case "GIT":
					document.location.href = "/git";
					break;
				case "HELP":
					setAlertHidden(true);
					break;
				default:
					break;
			}
		}
		//eslint-disable-next-line
	}, []);
	return <></>;
};

const parseResponse = (command, { data }) => {
	let response = command.response;
	return (
		<>
			<Action action={command.action} />
			<Wrapper
				dangerouslySetInnerHTML={{
					__html: response.replace(
						/%arg%/g,
						`<span class="style2">${sanitize(data)}</span>`
					),
				}}
			/>
		</>
	);
};

const getResponse = data => {
	let commandWithArgs = data.split(" ");
	if (commands.hasOwnProperty(commandWithArgs[0])) {
		let arg = "";
		let originalArg = "";
		if (commandWithArgs.length === 1) {
			arg = "_dir";
		} else if (
			commands[commandWithArgs[0]].validArgs.hasOwnProperty(
				commandWithArgs[1]
			)
		) {
			arg = commandWithArgs[1];
		} else {
			arg = "default";
		}
		originalArg = arg;
		if (arg === "default") {
			originalArg = commandWithArgs[1];
		}
		return parseResponse(commands[commandWithArgs[0]].validArgs[arg], {
			data: originalArg,
		});
	} else {
		return getErrorCommand(data);
	}
};

export default getResponse;
