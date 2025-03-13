import React from 'react';
import styled from 'styled-components';

const HowItWorksContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #004aad;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const StepNumber = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: #004aad;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 15px;
`;

const StepText = styled.div`
  font-size: 16px;
  color: #333;

  strong {
    color: #004aad;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 25px 0;
`;

const SubTitle = styled.h3`
  font-size: 20px;
  color: #004aad;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const Th = styled.th`
  background: #004aad;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const HowItWorks: React.FC = () => {
  return (
    <HowItWorksContainer>
      <Title>Como Funciona</Title>

      <StepList>
        <Step>
          <StepNumber>1</StepNumber>
          <StepText>
            <strong>Exporte seu arquivo do software BIM:</strong> No Revit,
            ArchiCAD, Vectorworks, Tekla ou outros softwares BIM, vá até
            “Arquivo” {'>'} “Exportar” {'>'} “IFC” e salve o arquivo no seu
            computador.
          </StepText>
        </Step>

        <Step>
          <StepNumber>2</StepNumber>
          <StepText>
            <strong>Faça o Upload no Sistema:</strong> Clique no botão “Enviar
            Arquivo” e selecione o arquivo **.IFC exportado. O sistema aceita
            diferentes versões do IFC, como IFC 2x3 e IFC 4.0.
          </StepText>
        </Step>

        <Step>
          <StepNumber>3</StepNumber>
          <StepText>
            <strong>O sistema processa os materiais:</strong> Nosso sistema
            analisa automaticamente o arquivo, extraindo a lista de materiais,
            incluindo quantidades e unidades utilizadas no projeto.
          </StepText>
        </Step>

        <Step>
          <StepNumber>4</StepNumber>
          <StepText>
            <strong>Receba os resultados e exporte:</strong> Após o
            processamento, você pode visualizar a lista detalhada de materiais e
            exportar os dados para Excel (XLSX), CSV ou PDF.
          </StepText>
        </Step>
      </StepList>

      <Divider />

      <SubTitle>📌 Softwares Populares que Exportam para .IFC</SubTitle>
      <p style={{ textAlign: 'center', color: '#444' }}>
        Se ainda não exportou seu arquivo IFC, siga estas instruções no seu
        software:
      </p>

      <Table>
        <thead>
          <tr>
            <Th>Software</Th>
            <Th>Caminho para Exportação</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Autodesk Revit</Td>
            <Td>
              Arquivo {'>'} Exportar {'>'} IFC
            </Td>
          </tr>
          <tr>
            <Td>ArchiCAD (Graphisoft)</Td>
            <Td>
              Arquivo {'>'}Salvar Como {'>'} IFC
            </Td>
          </tr>
          <tr>
            <Td>Vectorworks</Td>
            <Td>
              Arquivo {'>'} Exportar {'>'} Exportar IFC
            </Td>
          </tr>
          <tr>
            <Td>Tekla Structures</Td>
            <Td>Exportar {'>'} IFC</Td>
          </tr>
          <tr>
            <Td>Allplan</Td>
            <Td>Exportar Modelo BIM</Td>
          </tr>
        </tbody>
      </Table>

      <p style={{ textAlign: 'center', color: '#444', marginTop: '20px' }}>
        Caso use outro software e precise de ajuda, fale conosco! 📩
      </p>
    </HowItWorksContainer>
  );
};

export default HowItWorks;
