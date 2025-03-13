import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Ícones do menu

const NavbarContainer = styled.nav`
  font-family: 'Oval Black', sans-serif;
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Garante espaço entre logo e menu */
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 40px;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #004aad;
  white-space: nowrap;
`;

const NavLinks = styled.ul<{ open: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    align-items: center;
    gap: 15px;
  }
`;

const NavItem = styled.li`
  white-space: nowrap;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: #004aad;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #002c6e;
  }
`;

const NavRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* Espaço entre os links e o ícone do menu */
  flex-grow: 1;
  justify-content: flex-end; /* Empurra tudo para a direita */
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 28px;
  color: #004aad;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      <NavLink to="/">
        <LogoContainer>
          <Logo src="/logo.png" alt="GO | Quantitativo BIM" />
          <LogoText>| Quantitativo BIM</LogoText>
        </LogoContainer>
      </NavLink>

      <NavRightContainer>
        <NavLinks open={menuOpen}>
          <NavItem>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Início
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/comofunciona" onClick={() => setMenuOpen(false)}>
              Como Funciona
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink to="/precos" onClick={() => setMenuOpen(false)}>
              Preços
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink to="/sobre" onClick={() => setMenuOpen(false)}>
              Sobre
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contato" onClick={() => setMenuOpen(false)}>
              Contato
            </NavLink>
          </NavItem>
        </NavLinks>

        {/* Ícone do Menu Mobile na extrema direita */}
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </MenuIcon>
      </NavRightContainer>
    </NavbarContainer>
  );
};

export default Navbar;
