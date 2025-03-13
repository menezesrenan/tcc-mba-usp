import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';

// 🔹 Definição dos estilos para o botão flutuante
const Button = styled.button<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #004aad;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.2s ease;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #00388a;
    transform: scale(1.1);
  }
`;

const ToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Detecta o scroll da página para exibir ou esconder o botão
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔹 Função para voltar ao topo suavemente
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      isVisible={isVisible}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} />
    </Button>
  );
};

export default ToTop;
