//import React, { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
//Animation
import { motion } from "framer-motion";
import { PageAnimation } from "../Animation";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <ContactStyle
      style={{ background: "#fff" }}
      variants={PageAnimation}
      exit="exit"
      initial="hidden"
      animate="show"
    >
      <Title>
        <Hide>
          <motion.h2 variants={titleAnim} style={{ fontSize: "2rem" }}>
            Get in touch.
          </motion.h2>
        </Hide>
        <div className="line2"></div>
      </Title>
      <Hide>
        <Social variants={titleAnim}>
          <Circle />
          <Link to="/contact-me">
            {" "}
            <h2>Socials</h2>
          </Link>
        </Social>
      </Hide>
      <Hide>
        <Social variants={titleAnim}>
          <Circle />
          <Link to="/contact-me">
            {" "}
            <h2>Send us a message</h2>
          </Link>
        </Social>
      </Hide>
      <Hide>
        <Social variants={titleAnim}>
          <Circle />
          <Link to="/contact-me">
            <h2>Drop an email.</h2>
          </Link>
        </Social>
      </Hide>
    </ContactStyle>
  );
};
const titleAnim = {
  hidden: { y: 200 },
  show: {
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.75 },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { type: "tween", ease: "easeOut", duration: 0.75, delay: 0.5 },
  },
};
const ContactStyle = styled(motion.div)`
  padding: 5rem 10rem;
  color: #353535;
  min-height: 90vh;

  @media (max-width: 969px) {
    padding: 1rem;
    font-size: 0.5rem;
  }
`;
const Title = styled.div`
  margin-bottom: 4rem;
  color: black;
  @media (max-width: 969px) {
    margin-top: 5rem;
  }
`;
const Hide = styled.div`
  overflow: hidden;
`;
const Social = styled(motion.div)`
  display: flex;
  align-items: center;
  h2 {
    cursor: pointer;
    margin: 2rem;
  }
  @media (max-width: 1500px) {
    h2 {
      margin: 1rem 0rem;
      font-size: 2.5rem;
    }
  }
`;
const Circle = styled.div`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  background: #353535;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 20px;
`;
export default AboutUs;
