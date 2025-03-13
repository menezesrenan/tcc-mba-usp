import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #004aad;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;

  a {
    color: #ffffff;
    font-size: 20px;
    transition: 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  margin-top: 10px;
  opacity: 0.8;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <a
          href="https://linkedin.com/company/gestaodeobras"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://instagram.com/gestao.de.obras"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a href="mailto:contato@gestaodeobras.com">
          <FaEnvelope />
        </a>
      </SocialIcons>
      <Copyright>
        © {new Date().getFullYear()} Gestão de Obras | Quantitativo BIM. Todos
        os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
