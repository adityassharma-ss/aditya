import React from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";

const Iframe = styled.iframe`
	width: 100%;
	height: 95%;
	border: none;
`;

const ResumeContent = ({ title, content }) => {
    return (
        <BodyContent>
            <Iframe src="https://drive.google.com/file/d/1wy__vQYsIlORXRCuxey2Uder6ccJc0ie/preview" frameBorder="0" title="VsCode"></Iframe>
        </BodyContent>
    );
};

export default ResumeContent;
