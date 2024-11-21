import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <img
            src={logo}
            alt="description"
            style={{ width: "80px", height: "54px", borderRadius: "10px", border: "2px solid #ccc" }}
          />
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
            <Link
            to="/"
            className="nav-link"
            style={{fontSize: '0.938rem',fontWeight:"semi-bold", cursor:"pointer"}}
          >
            Home
          </Link>
            </li>
            <li className="semiBold font15 pointer">
            <ScrollLink
 activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Projects
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                Blog
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Pricing
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </ScrollLink>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <button
              className="btn btn-outline-dark font-weight-semibold"
              style={{ backgroundColor: "#737373", color: "white", cursor: "pointer", marginRight: "10px" }}
              onClick={() => navigate("/SignUp")}
            >
              S'inscrire
            </button>
            <button
              className="btn btn-outline-dark font-weight-semibold"
              style={{ backgroundColor: "#737373", color: "white", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Se connecter
            </button>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
