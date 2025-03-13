import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UploadContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging: boolean }>`
  font-family: 'Oval Black', sans-serif;
  border: 2px dashed ${(props) => (props.isDragging ? '#004aad' : '#ccc')};
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  transition: border-color 0.3s ease;
  background: ${(props) => (props.isDragging ? '#f0f5ff' : 'white')};

  &:hover {
    border-color: #004aad;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: #ddd;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;

  & div {
    width: ${(props) => props.progress}%;
    height: 100%;
    background: #004aad;
    transition: width 0.3s ease;
  }
`;

const StatusMessage = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #004aad;
`;

interface UploadResponse {
  filename: string;
}

const FileUpload: React.FC<{
  onUploadSuccess: (data: UploadResponse) => void;
}> = ({ onUploadSuccess }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = async (file: File, retryCount = 0) => {
    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://quantitativo-bim.onrender.com/upload/',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            }
          },
        }
      );

      setIsUploading(false);
      setUploadProgress(100);
      onUploadSuccess(response.data);
    } catch (error: any) {
      console.error('Erro no upload:', error);

      if (error.response) {
        setErrorMessage('Erro no servidor. Tente novamente.');
      } else if (error.code === 'ERR_NETWORK') {
        setErrorMessage(
          'O servidor pode estar temporariamente indisponível. Tente novamente em alguns instantes.'
        );
      } else {
        setErrorMessage('Falha ao enviar arquivo. Tente novamente.');
      }

      // 🔄 Tenta novamente se a API estiver dormindo
      if (retryCount < 3) {
        setTimeout(() => handleFileUpload(file, retryCount + 1), 5000);
      } else {
        setIsUploading(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileUpload(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileUpload(event.dataTransfer.files[0]);
    }
  };

  return (
    <UploadContainer
      isDragging={dragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <p>📁 Arraste e solte seu arquivo IFC aqui ou clique para selecionar</p>
      <HiddenInput
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        accept=".ifc"
      />

      {isUploading && (
        <ProgressBar progress={uploadProgress}>
          <div />
        </ProgressBar>
      )}
      {isUploading && (
        <StatusMessage>⏳ Enviando... {uploadProgress}%</StatusMessage>
      )}
      {errorMessage && (
        <StatusMessage style={{ color: 'red' }}>{errorMessage}</StatusMessage>
      )}
    </UploadContainer>
  );
};

export default FileUpload;
