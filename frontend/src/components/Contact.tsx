import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  text-align: center;
  padding: 30px 20px;
  max-width: 850px;
  margin: 50px auto;
  margin-top: 50px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 30px;
  color: #004aad;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Highlight = styled.strong`
  color: #000;
`;

const EmailBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  padding: 12px;
  border-radius: 8px;
  font-size: 18px;
  color: #004aad;
  font-weight: bold;
  max-width: 500px;
  margin: 0 auto;
`;

const CopyButton = styled.button`
  background: #004aad;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 12px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #002c6e;
    transform: scale(1.05);
  }
`;

const Contact: React.FC = () => {
  const email = 'contato@gestaodeobras.com';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset mensagem após 2s
  };

  return (
    <ContactContainer>
      <Title>Entre em Contato</Title>

      <Description>
        Caso precise de suporte ou tenha dúvidas sobre o sistema, entre em
        contato por e-mail. Nossa equipe está pronta para ajudá-lo!
      </Description>

      <EmailBox>
        {email}
        <CopyButton onClick={handleCopyEmail}>
          {copied ? 'Copiado! ✅' : 'Copiar'}
        </CopyButton>
      </EmailBox>

      <Description>
        Se o seu arquivo <Highlight>.IFC</Highlight> não retornou os resultados
        esperados,
        <Highlight> envie o arquivo para nós</Highlight> junto com uma breve
        explicação do que esperava obter. Faremos o possível para melhorar a
        compatibilidade no sistema e adicionar suporte às suas necessidades o
        mais breve possível!
      </Description>
    </ContactContainer>
  );
};

export default Contact;
