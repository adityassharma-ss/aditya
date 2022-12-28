import React from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";

const Iframe = styled.iframe`
	width: 100%;
	border: none;
`;
const Zone = () => {
	return (
		<BodyContent>
			<Iframe
				src="https://www.youtube.com/watch?v=UtF6Jej8yb4"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></Iframe>
		</BodyContent>
	);
};

export default Zone;
