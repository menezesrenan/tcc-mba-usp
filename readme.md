# 🎓 TCC MBA USP — Gestão de Obras com Quantitativo BIM

Este projeto é composto por dois repositórios — **frontend** e **backend** — que juntos formam uma aplicação para o **processamento de arquivos `.IFC`** e a **geração automatizada de listas de materiais**.

---

## 📁 Estrutura do Projeto

- **Frontend**: Interface do usuário desenvolvida em **React**.
- **Backend**: API desenvolvida em **FastAPI** para processar arquivos `.IFC`.

---

## 🚀 Como Rodar o Projeto

### 🔧 Backend

> Requisitos: **Python 3.9 ou superior**

```bash
# Crie e ative o ambiente virtual (se necessário)
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate     # Windows

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor FastAPI
uvicorn main:app --reload
```

📡 O backend estará disponível em: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 💻 Frontend

> Requisitos: **Node.js**

```bash
# Instale as dependências do projeto
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

🌐 O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🧭 Fluxo de Uso

1. **Faça upload** de um arquivo `.IFC` na interface do frontend.
2. O **backend processa** o arquivo e retorna uma **lista de materiais**.
3. A lista pode ser:
   - **Visualizada**
   - **Filtrada**
   - **Exportada** nos formatos: `.PDF`, `.XLSX` ou `.CSV`.

---

## 🛠️ Tecnologias Utilizadas

### ⚙️ Frontend

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)

### ⚙️ Backend

- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)

### 📦 Exportação de Dados

- [jsPDF](https://github.com/parallax/jsPDF)
- [xlsx](https://github.com/SheetJS/sheetjs)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)

---

## 🤝 Contribuição

Contribuições são **bem-vindas**!  
Se você encontrou um problema ou tem sugestões de melhoria, sinta-se à vontade para:

- Abrir uma **issue**
- Enviar um **pull request**

---

## 📄 Licença

Este projeto é de **uso acadêmico** e está licenciado sob os termos da [MIT License](LICENSE).
