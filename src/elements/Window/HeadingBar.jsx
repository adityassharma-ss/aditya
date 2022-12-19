import React from "react";
// eslint-disable-next-line
import styled from "styled-components";
import theme from "@styles/theme";
import icon from "@static/home.png";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	grid-template-columns: 1fr 2fr;
	position: relative;
	background: ${theme.headerBgStart};
	background: linear-gradient(
		180deg,
		${theme.headerBgStart} 0%,
		${theme.headerBgEnd} 100%
	);
	max-width: 100%;
	height: 2rem;
	border-radius: 0.6rem 0.6rem 0 0;
	border: ${theme.headerBorder} 1px solid;
	box-shadow: inset #f5f5f5 0px 2px 1px, inset #d5d5d5 0 -2px 2px;
	user-select: none;
	cursor: move;
`;

const DotContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
`;

const StyledDot = styled.div`
	position: relative;
	background: ${props => props.variant && props.variant};
	border: 1px solid ${props => props.variant && props.variant.darken(0.175)};
	height: 1rem;
	width: 1rem;
	border-radius: 50%;
	margin: 0 0 0 0.75rem;
	cursor: pointer;
	&:after {
		content: "";
		height: 0.3rem;
		width: 0.3rem;
		background: transparent;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: background 0.1s ease;
	}
	&:hover {
		&:after {
			background: ${props => props.variant && props.variant.darken(0.4)};
		}
	}
`;

const TitleContainer = styled.div`
	width: 100%;
	text-align: center;
`;

const Title = styled.p`
	color: ${theme.titleFont};
	line-height: 1.4;
	letter-spacing: -0.25px;
	font-size: 1rem;
	font-weight: 600;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin: 0 6rem 0 1rem;
`;

const Icon = styled.img`
	height: 1.2rem;
	vertical-align: middle;
	padding: 0 0.2rem 1px 0;
`;

const Dot = props => {
	let variant = theme[`dot${props.variant}`];
	return <StyledDot onClick={props.onClick} variant={variant} />;
};

const HeadingBar = props => {
	let history = useHistory();
	return (
		<Wrapper className={props.altClassName}>
			<DotContainer>
				<Dot
					variant="1"
					onClick={() => {
						history.goBack();
					}}
				/>
				<Dot variant="2" />
				<Dot
					variant="3"
					onClick={() => {
						history.goForward();
					}}
				/>
			</DotContainer>
			<TitleContainer>
				<Title>
					<Icon src={icon} alt="home icon" /> {props.heading}
				</Title>
			</TitleContainer>
		</Wrapper>
	);
};

export default HeadingBar;
