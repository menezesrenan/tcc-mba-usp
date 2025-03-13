import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  font-family: 'Oval Black', sans-serif;
  max-width: 850px;
  margin: 50px auto;
  margin-top: 50px;

  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #004aad;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
  line-height: 1.7;
  text-align: justify;
  margin-bottom: 25px;
`;

const Highlight = styled.strong`
  font-weight: bold;
  color: #000;
`;

const List = styled.ul`
  padding: 0;
  margin-top: 30px;
`;

const ListItem = styled.li`
  text-decoration: none;
  list-style-type: none;
  font-size: 17px;
  margin: 15px 0;
  padding-left: 15px;
  border-left: 4px solid #004aad;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Title>Sobre o Nosso Serviço</Title>

      <Description>
        Nosso sistema permite que você{' '}
        <Highlight>calcule automaticamente</Highlight> a quantidade de{' '}
        <Highlight>qualquer material em projetos IFC</Highlight>. Basta
        <Highlight> fazer o upload do seu arquivo .ifc</Highlight>, e nós
        processamos as informações para fornecer uma quantificação detalhada de
        todos os materiais presentes no modelo.
      </Description>

      <List>
        <ListItem>
          <Highlight>Simples e rápido:</Highlight> Envie seu arquivo e obtenha
          os resultados em segundos.
        </ListItem>
        <ListItem>
          <Highlight>Preciso e confiável:</Highlight> Algoritmos otimizados para
          a identificação e quantificação de diversos materiais.
        </ListItem>
        <ListItem>
          <Highlight>Compatível com múltiplos formatos:</Highlight> Suporte para
          diferentes nomenclaturas e configurações de arquivos IFC.
        </ListItem>
        <ListItem>
          <Highlight>Limitações em nomenclaturas:</Highlight> Algumas variações
          de nomes de materiais podem não ser reconhecidas automaticamente.
          Estamos trabalhando para ampliar essa compatibilidade.
        </ListItem>
      </List>

      <Description>
        Experimente agora mesmo e tenha uma{' '}
        <Highlight>análise detalhada de todos os materiais</Highlight> no seu
        projeto!
      </Description>
    </AboutContainer>
  );
};

export default About;
