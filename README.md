# MediBot 🩺

MediBot is a web-based medical assistant that combines conversational AI with medical report analysis. Users can chat with the assistant normally or upload a medical report in PDF format and receive an analysis based on the extracted text.

> **Note:** MediBot is intended for educational and informational purposes only. It is not a replacement for professional medical advice, diagnosis, or treatment.

## ✨ Features

* 💬 **AI Chat Interface** — Have a natural conversation with MediBot.
* 📄 **Medical PDF Upload** — Upload medical reports directly through the interface.
* 🔍 **PDF Text Extraction** — Extract text from uploaded PDF reports.
* 🧠 **Report Analysis** — Use the extracted report content for further analysis and discussion.
* ⚡ **Responsive Interface** — Clean and interactive frontend built with React.
* 🎨 **Modern UI** — Styled using Tailwind CSS.
* 🔄 **API Integration** — Axios is used for communication with the backend/API.

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* Axios
* React PDF (`react-pdf`)
* HTML5 / CSS3

### Tools

* Vite
* npm
* Git & GitHub
* VS Code

## 📁 Project Structure

```text
medical-chatbot/
│
├── public/
│
├── src/
│   ├── components/
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   ├── index.js
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anmolsharmaa7/medical-chatbot.git
```

### 2. Navigate to the project

```bash
cd medical-chatbot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

The application will be available at the local development URL shown in your terminal.

## ⚙️ How It Works

The application provides two main ways to interact with MediBot:

### 💬 Normal Chat

1. Enter a question or message in the chat interface.
2. MediBot processes the request through the connected API.
3. The response is displayed in the conversation.

### 📄 Medical Report Analysis

1. Upload a medical report in PDF format.
2. The application reads the uploaded file.
3. Text is extracted from the PDF.
4. The extracted information is added to the conversation context.
5. Users can ask questions about the uploaded report.

## 🔐 Environment Variables

If your API requires environment variables, create a `.env` file in the project root.

Example:

```env
REACT_APP_API_URL=your_api_url_here
```

Do **not** commit `.env` files or API keys to GitHub.

## 📌 Future Improvements

* [ ] Improve medical report summarization
* [ ] Add support for additional document formats
* [ ] Add authentication and user accounts
* [ ] Store previous conversations
* [ ] Add multilingual support
* [ ] Improve accessibility and mobile responsiveness
* [ ] Add more advanced medical-report insights
* [ ] Deploy the application for public use

## ⚠️ Disclaimer

MediBot is an educational software project and should not be used as a substitute for a qualified doctor or other healthcare professional.

The information provided by the application may be incomplete or inaccurate. Always consult a qualified healthcare professional for medical diagnosis, treatment, or emergency situations.

## 👨‍💻 Author

**Anmol Sharma**

GitHub: [@Anmolsharmaa7](https://github.com/Anmolsharmaa7)

---

⭐ If you find this project useful, consider giving it a star on GitHub!
