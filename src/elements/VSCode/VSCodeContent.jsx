import React from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";

const Iframe = styled.iframe`
	width: 100%;
	height: 95%;
	border: none;
`;

const VSCodeContent = () => {
	return (
		<BodyContent>
			<Iframe
				src="https://github1s.com/adityassharma-ss/aditya/blob/master/src/components/VSCode.jsx"
				frameBorder="0"
				title="VsCode"
			></Iframe>
		</BodyContent>
	);
};

export default VSCodeContent;
