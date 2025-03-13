import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PageContainer = styled.div`
  font-family: 'Oval Black', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Layout: React.FC = () => {
  return (
    <PageContainer>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Layout;
