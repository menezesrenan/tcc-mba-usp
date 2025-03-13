import React from 'react';
import styled from 'styled-components';

const plans = [
  {
    name: 'Gratuito',
    price: 'R$0',
    features: [
      '20 arquivos/mês',
      'Velocidade: Normal',
      'Tamanho máximo: 5MB',
      'Suporte limitado',
    ],
    color: '#ccc',
  },
  {
    name: 'Básico',
    price: 'R$49',
    features: [
      '500 arquivos/mês',
      'Velocidade: Alta',
      'Tamanho máximo: 50MB',
      'Suporte prioritário',
    ],
    color: '#8A2BE2',
  },
  {
    name: 'Premium',
    price: 'R$99',
    features: [
      '2000 arquivos/mês',
      'Velocidade: Ultra',
      'Tamanho máximo: 100MB',
      'Suporte VIP',
    ],
    color: '#007BFF',
  },
];

const Pricing: React.FC = () => {
  return (
    <Container>
      <Title>Escolha o Melhor Plano para Você</Title>
      <PlansContainer>
        {plans.map((plan, index) => (
          <Plan key={index} color={plan.color}>
            <PlanTitle>{plan.name}</PlanTitle>
            <Price>{plan.price}</Price>
            <Features>
              {plan.features.map((feature, i) => (
                <Feature key={i}>{feature}</Feature>
              ))}
            </Features>
            <Button>Escolher Plano</Button>
          </Plan>
        ))}
      </PlansContainer>
    </Container>
  );
};

// 🎨 Estilos melhorados
const Container = styled.div`
  font-family: 'Oval Black', sans-serif;
  text-align: center;
  padding: 50px 20px;
  background: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Plan = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  color: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 280px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PlanTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
`;

const Feature = styled.li`
  font-size: 16px;
  margin: 8px 0;
`;

const Button = styled.button`
  background: white;
  color: #000;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

export default Pricing;
