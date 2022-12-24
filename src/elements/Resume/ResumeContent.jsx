/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import MyResume from "./resume/MyResume.pdf"
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
			<Iframe src={MyResume} frameBorder="0" title="VsCode"></Iframe>

		</BodyContent>

  );
};

export default ResumeContent;