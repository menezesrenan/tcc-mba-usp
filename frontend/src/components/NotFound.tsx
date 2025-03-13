import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  font-family: 'Oval Black', sans-serif;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: bold;
  color: #004aad;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
`;

const HomeButton = styled(Link)`
  background: #004aad;
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #002c6e;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Página Não Encontrada</Subtitle>
      <Description>
        Oops! A página que você está procurando não existe ou foi movida.
      </Description>
      <HomeButton to="/">Voltar para a Página Inicial</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
