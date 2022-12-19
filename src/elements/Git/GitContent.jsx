import React, { useEffect, useState } from "react";
//eslint-disable-next-line
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import axios from "axios";
import theme from "@styles/theme";

const Wrapper = styled(SimpleBarReact)`
	font-family: "Hack", monospace;
	.simplebar-scrollbar:before {
		border-radius: 10px;
		background-color: ${theme.scrollbarThumb};
	}
	overflow: auto;
	color: ${theme.bodyFont1};
	height: 100%;
	width: 100%;
	padding: 1rem;
	max-height: 80vh;
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

const getSpaces = commandList => {
	let defaultSpaces = "\t";
	let lengthList = commandList.map(item => {
		return item.name.length;
	});
	// console.log(commandList)
	let max = Math.max(...lengthList);
	return commandList.map(item => {
		return Array(max - item.name.length + 1).join(" ") + defaultSpaces;
	});
};

const GitContent = () => {
	const [data, setData] = useState();
	useEffect(() => {
		axios
			.get("https://api.github.com/users/adityassharma-ss/repos?per_page=100")
			.then(res => {
				let data = res.data.sort((a, b) => {
					let x = a.stargazers_count;
					let y = b.stargazers_count;
					return x > y ? -1 : x < y ? 1 : 0;
				});
				let response = "";
				let base = [
					{
						name: "Name",
						description: "Description",
						url: "Url",
						stars: "Stars",
					},
					{
						name: "",
						description: "",
						url: "",
						stars: "",
					},
				];
				let mappedData = [
					...base,
					...data.map(item => {
						return {
							name: item.name,
							description: item.description,
							url: item.html_url,
							stars: item.stargazers_count,
						};
					}),
				];
				let spaceList = getSpaces(mappedData);
				mappedData.forEach((item, idx) => {
					response += `<span class="${
						idx !== 0 && `style2`
					}"><a target="_blank" href="${item.url}">${
						item.name
					}</a></span>${spaceList[idx]}<span class="${
						idx !== 0 && `style5`
					}">${
						item.stars === 0 ? "-" : item.stars
					}</span>\t<span class="${idx !== 0 && `style4`}">${
						item.description ? item.description : ""
					}</span>\n`;
				});
				setData(response);
			});
	}, []);
	return (
		<BodyContent>
			<Wrapper>
				<pre
					dangerouslySetInnerHTML={{
						__html: data,
					}}
				></pre>
			</Wrapper>
		</BodyContent>
	);
};

export default GitContent;
