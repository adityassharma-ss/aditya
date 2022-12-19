import React from "react";
import styled from "styled-components";
import theme from "@styles/theme";
import "@styles/loader.scss";

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	background: ${theme.bodyBg};
`;

const Loader = () => {
	return (
		<LoadingContainer>
			<div className="spinner center">
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
				<div className="spinner-blade"></div>
			</div>
		</LoadingContainer>
	);
};

export default Loader;
