import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

  
const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "black", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        Heading för footer...
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Om oss</Heading>
            <FooterLink href="#">11</FooterLink>
            <FooterLink href="#">22</FooterLink>
            <FooterLink href="#">33</FooterLink>
          </Column>
          <Column>
            <Heading>Tjänster</Heading>
            <FooterLink href="#">1</FooterLink>
            <FooterLink href="#">2</FooterLink>
            <FooterLink href="#">3</FooterLink>
            <FooterLink href="#">4</FooterLink>
          </Column>
          <Column>
            <Heading>Kontakta oss</Heading>
            <FooterLink href="#">Kalle</FooterLink>
            <FooterLink href="#">Hjalle</FooterLink>
            <FooterLink href="#">Fjalle</FooterLink>
            <FooterLink href="#">Nalle</FooterLink>
          </Column>
          <Column>
            <Heading>Sociala Medier</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;