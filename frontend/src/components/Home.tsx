import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileUpload from '../components/FileUpload';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ToTop from './ToTop';

// 🎨 Estilos
const HomeContainer = styled.div`
  font-family: 'Oval Black', sans-serif;
  max-width: 900px;
  margin: 40px auto;
  text-align: center;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 32px;
  color: #004aad;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
  text-align: left;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const Button = styled.button`
  background: #004aad;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  font-size: 14px;

  &:hover {
    background: #00388a;
  }
`;

// 🔹 **Mensagem de erro formatada corretamente**
const LoadingMessage = styled.div`
  font-size: 16px;
  color: #004aad;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  background: #f0f5ff;
  border-radius: 10px;
  border: 2px solid #004aad;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  span {
    display: block;
    margin-top: 5px;
  }
`;

// 🔹 **Seção "Como Funciona"**
const StepsContainer = styled.div`
  margin-top: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StepsTitle = styled.h2`
  font-size: 24px;
  color: #004aad;
  margin-bottom: 20px;
  text-align: center;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  gap: 15px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const StepNumber = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  background: #004aad;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StepText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

interface Material {
  id: number;
  Material: string;
  Valor: number;
  Unidade: string;
  selected: boolean;
}
const Home: React.FC = () => {
  const [uploadResult, setUploadResult] = useState<{ filename: string } | null>(
    null
  );
  const [materiais, setMateriais] = useState<
    {
      id: number;
      Material: string;
      Valor: number;
      Unidade: string;
      selected: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [hideZeroValues, setHideZeroValues] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  // Atualiza a seleção do checkbox
  const handleCheckboxChange = (id: number) => {
    setMateriais((prev) =>
      prev.map((mat) =>
        mat.id === id ? { ...mat, selected: !mat.selected } : mat
      )
    );
  };

  // Atualiza o estado quando o upload for bem-sucedido
  const handleUploadSuccess = (data: { filename: string }) => {
    setUploadResult(data);
    setFileUploaded(true);
    fetchMateriais();
  };

  useEffect(() => {
    if (uploadResult) {
      fetchMateriais();
    }
  }, [uploadResult]);

  const fetchMateriais = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/materiais/');
      const data = await response.json();
      const formattedData: Material[] = data.map(
        (mat: Material, index: number) => ({
          ...mat,
          id: index,
          selected: true, // ✅ Todos iniciam selecionados
        })
      );
      setMateriais(formattedData);
    } catch (error) {
      console.error('Erro ao buscar materiais:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ocultar ou mostrar valores 0
  const toggleHideZeroValues = () => {
    setHideZeroValues((prev) => !prev);
  };

  // Selecionar ou desmarcar todos
  const handleSelectAll = () => {
    setMateriais((prev) =>
      prev.map((mat) => ({ ...mat, selected: !selectAll }))
    );
    setSelectAll((prev) => !prev);
  };

  // Exportar para XLSX ou CSV
  const handleExport = (format: 'xlsx' | 'csv') => {
    const selectedMateriais = materiais.filter(
      (mat) => mat.selected && (!hideZeroValues || mat.Valor !== 0)
    );

    if (selectedMateriais.length === 0) {
      alert('Nenhum material selecionado para exportação!');
      return;
    }

    const ws = XLSX.utils.aoa_to_sheet([
      ['GO | Quantitativo BIM'], // 🏗️ Título na primeira linha
      ['Arquivo IFC - Lista de Materiais'], // 📋 Subtítulo
      [],
      ['Material', 'Quantidade', 'Unidade'], // 🏷️ Cabeçalho
      ...selectedMateriais.map((mat) => [
        mat.Material,
        mat.Valor.toFixed(2),
        mat.Unidade || '-',
      ]),
    ]);

    // 🔹 Ajusta automaticamente a largura das colunas
    ws['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 15 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Materiais');

    if (format === 'xlsx') {
      XLSX.writeFile(wb, 'go_quantativo_bim.xlsx');
    } else {
      const csvOutput = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'go_quantativo_bim.csv');
    }
  };
  const logoUrl = '/logo.png';

  const exportToPDF = () => {
    const selectedMateriais = materiais.filter(
      (mat) => mat.selected && (!hideZeroValues || mat.Valor !== 0)
    );

    if (selectedMateriais.length === 0) {
      alert('Nenhum material selecionado para exportação!');
      return;
    }

    const doc = new jsPDF();

    // 🖼️ Adicionando o logo
    doc.addImage(logoUrl, 'PNG', 10, 10, 20, 20); // (imagem, tipo, x, y, largura, altura)

    // 🏗️ Adicionando o título ao lado do logo
    doc.setTextColor(0, 74, 173); // 🔹 Azul (#004AAD)
    doc.setFontSize(18);
    doc.text('| Quantitativo BIM', 36, 22);

    // 📝 Descrição
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(
      [
        'Envie seu arquivo .IFC e obtenha automaticamente uma listagem detalhada',
        'dos materiais utilizados no projeto, incluindo quantidades e unidades.',
      ],
      15,
      40
    );

    // 📋 Criando a tabela de materiais
    const tableData = selectedMateriais.map((mat) => [
      mat.Material,
      mat.Valor.toFixed(2),
      mat.Unidade || '-',
    ]);

    autoTable(doc, {
      head: [['Material', 'Quantidade', 'Unidade']],
      body: tableData,
      startY: 50, // ⬇️ Posicionamento abaixo do título
    });

    // 🌐 Adicionando o site no rodapé
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text('https://gestaodeobras.com', 10, pageHeight - 10);

    // 📥 Salvar o arquivo
    doc.save('go_quantativo_bim.pdf');
  };

  return (
    <HomeContainer>
      <Title>GO | Quantitativo BIM</Title>
      <Description>
        Envie seu arquivo <strong>.ifc</strong> e obtenha automaticamente a
        lista de materiais no projeto. 🚀
      </Description>

      <FileUpload onUploadSuccess={handleUploadSuccess} />

      {loading ? (
        <p>⏳ Carregando materiais...</p>
      ) : materiais.length > 0 ? (
        <>
          <h2>📋 Lista de Materiais</h2>
          <Button onClick={exportToPDF}>📄 Exportar PDF</Button>
          <Button onClick={() => handleExport('xlsx')}>📥 Exportar XLSX</Button>
          <Button onClick={() => handleExport('csv')}>📥 Exportar CSV</Button>
          <Button onClick={toggleHideZeroValues}>
            {hideZeroValues
              ? '👀 Mostrar Quantidade 0'
              : '❌ Ocultar Quantidade 0'}
          </Button>
          <Button onClick={handleSelectAll}>
            {selectAll ? '☑️ Selecionar Todos' : '☐ Desmarcar Todos'}
          </Button>

          <Table>
            <thead>
              <tr>
                <Th>
                  <Checkbox
                    type="checkbox"
                    checked={materiais.every((mat) => mat.selected)}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th>Material</Th>
                <Th>Quantidade</Th>
                <Th>Unidade</Th>
              </tr>
            </thead>
            <tbody>
              {materiais
                .filter((mat) => !hideZeroValues || mat.Valor !== 0)
                .map((mat) => (
                  <tr key={mat.id}>
                    <Td>
                      <Checkbox
                        type="checkbox"
                        checked={mat.selected}
                        onChange={() => handleCheckboxChange(mat.id)}
                      />
                    </Td>
                    <Td>{mat.Material}</Td>
                    <Td>{mat.Valor.toFixed(2)}</Td>
                    <Td>{mat.Unidade || '-'}</Td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : (
        fileUploaded && (
          <LoadingMessage>
            <strong> 📭 Nenhum material encontrado.</strong>
            🔎 Verifique se o arquivo IFC foi enviado corretamente.{' '}
            <em>
              Algumas variações de nomes de materiais podem não ser reconhecidas
              automaticamente.
            </em>
            🚀 Estamos trabalhando para ampliar essa compatibilidade!
          </LoadingMessage>
        )
      )}

      <StepsContainer>
        <StepsTitle>Como Funciona</StepsTitle>
        <StepsList>
          <Step>
            <StepNumber>1</StepNumber>
            <StepText>
              Faça upload do seu arquivo <strong>.IFC</strong>.
            </StepText>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepText>
              Nosso sistema processa e calcula automaticamente a lista de
              materiais.
            </StepText>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepText>Receba os resultados instantaneamente na tela.</StepText>
          </Step>
        </StepsList>
      </StepsContainer>
      <ToTop />
    </HomeContainer>
  );
};

export default Home;
