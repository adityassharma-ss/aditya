import React, { Suspense, lazy } from "react";
import Loader from "@elements/Loader/Loader";
import styled from "styled-components";
import HeadingBar from "@elements/Window/HeadingBar";
import Draggable from "react-draggable";
import bg from "@static/bg5original.jpg";
import theme from "@styles/theme";
import AlertContent from "@elements/Alert/AlertContent";
import MenuContent from "@elements/Menu/MenuContent";
import { useLocation } from "react-router-dom";

const ContactContent = lazy(() => import("@elements/Contact/ContactContent"));

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: url(${bg}) no-repeat center center;
  background-size: cover;
  overflow: hidden;
`;

const Container = styled.div`
  width: fit-content;
  border-radius: 0.6rem;
  box-shadow: ${theme.windowShadow} 0px 1px 4px;
  resize: ${(props) => (props.resizable ? `both` : `none`)};
  overflow: hidden;
  backdrop-filter: blur(1rem);
  background: ${theme.bodyBgWithOpacity};
  ${(props) => props.height && `height: ${props.height}`}
`;

const Footer = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: center;
`;

const Default = (props) => {
  const { pathname } = useLocation();
  let resizable = false;

  if (props.resizable === undefined) {
    resizable = true;
  }

  const BOUND = 512;

  return (
    <>
      <MenuContent programName={props.programName} />
      <AlertContent type={pathname.includes("qemu") ? `qemu` : `hideHelp`} />
      <Wrapper>
        <Draggable
          bounds={{
            top: -128,
            left: -BOUND,
            right: BOUND,
            bottom: BOUND,
          }}
          handle=".heading-bar"
        >
          <Container
            height={props.height}
            resizable={resizable}
            isEmulator={props.heading === "qemu"}
            onContextMenu={(e) => {
              !props.contextMenu && e.preventDefault();
            }}
          >
            <HeadingBar altClassName="heading-bar" heading={props.heading} />
            {props.children}
          </Container>
        </Draggable>
      </Wrapper>
      <Footer>Simple component</Footer>
    </>
  );
};

const Contact = () => {
  return (
    <Default heading="Contact" resizable={false} programName="Contact">
      <Suspense fallback={<Loader />}>
        <ContactContent />
      </Suspense>
    </Default>
  );
};

export default Contact;