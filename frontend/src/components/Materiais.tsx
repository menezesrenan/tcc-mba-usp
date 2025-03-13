// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 20px;
// `;

// const Th = styled.th`
//   background: #004aad;
//   color: white;
//   padding: 10px;
//   text-align: left;
// `;

// const Td = styled.td`
//   padding: 10px;
//   border-bottom: 1px solid #ddd;
// `;

// const LoadingMessage = styled.p`
//   font-size: 14px;
//   color: #004aad;
//   text-align: center;
//   margin-top: 20px;
//   padding: 15px;
//   background: #f0f5ff;
//   border-radius: 10px;
//   border: 2px solid #004aad;
//   max-width: 500px;
//   margin-left: auto;
//   margin-right: auto;
//   line-height: 1.6;
//   font-weight: 500;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 8px;
// `;

// const Materiais: React.FC<{ fileUploaded: boolean }> = ({ fileUploaded }) => {
//   const [materiais, setMateriais] = useState<
//     { Material: string; Valor: number; Unidade: string }[]
//   >([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (fileUploaded) {
//       fetchMateriais();
//     }
//   }, [fileUploaded]);

//   const fetchMateriais = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/materiais/');
//       const data = await response.json();
//       setMateriais(data);
//     } catch (error) {
//       console.error('Erro ao buscar materiais:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Só exibe algo se um arquivo for carregado */}
//       {fileUploaded &&
//         (loading ? (
//           <LoadingMessage>⏳ Carregando materiais...</LoadingMessage>
//         ) : materiais.length > 0 ? (
//           <>
//             {/* O título agora só aparece se houver materiais */}
//             <h2>📋 Lista de Materiais</h2>
//             <Table>
//               <thead>
//                 <tr>
//                   <Th>Material</Th>
//                   <Th>Valor</Th>
//                   <Th>Unidade</Th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {materiais.map((mat, index) => (
//                   <tr key={index}>
//                     <Td>{mat.Material}</Td>
//                     <Td>{mat.Valor}</Td>
//                     <Td>{mat.Unidade || '-'}</Td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </>
//         ) : (
//           <LoadingMessage>
//             <strong>📭 Nenhum material encontrado.</strong>
//             🔎 Verifique se o arquivo IFC foi enviado corretamente.
//             <em>
//               Algumas variações de nomes de materiais podem não ser reconhecidas
//               automaticamente.
//             </em>
//             🚀 Estamos trabalhando para ampliar essa compatibilidade!
//           </LoadingMessage>
//         ))}
//     </div>
//   );
// };

// export default Materiais;
