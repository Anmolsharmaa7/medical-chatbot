import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm MediBot. You can chat normally or upload a medical report PDF for detailed analysis." }
  ]);
  const [input, setInput] = useState("");
  const [reportText, setReportText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  // Your Grok API Key
  const GROK_API_KEY = " ";

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const loadingTask = pdfjs.getDocument({ data: reader.result });
        const pdf = await loadingTask.promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map(item => item.str).join(" ") + "\n\n";
        }

        setReportText(fullText);
        addMessage("assistant", `✅ Report "${file.name}" uploaded successfully! Now ask me questions about it.`);
      } catch (err) {
        addMessage("assistant", "❌ Could not extract text from PDF.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    addMessage("user", userMessage);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.x.ai/v1/chat/completions",
        {
          model: "grok-3",           // or grok-2-1212 if available
          messages: [
            {
              role: "system",
              content: reportText 
                ? `You are a helpful medical assistant. Use this medical report to answer accurately: ${reportText.substring(0, 15000)}` 
                : "You are a helpful, friendly medical assistant. Answer in simple language."
            },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            Authorization: `Bearer ${GROK_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = response.data.choices[0].message.content;
      addMessage("assistant", reply);
    } catch (error) {
      console.error(error);
      addMessage("assistant", "❌ Grok API Error. Please check your key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10 text-center">
          <h1 className="text-5xl font-bold">🩺 MediBot</h1>
          <p className="mt-2 text-xl">AI Medical Chatbot (Grok)</p>
        </div>

        <div className="flex h-[75vh]">
          {/* Upload Sidebar */}
          <div className="w-96 bg-gray-50 p-8 border-r">
            <h3 className="text-2xl font-semibold mb-6">Upload Medical Report</h3>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-4 file:px-6 file:rounded-2xl file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {fileName && <p className="mt-4 text-green-600 font-medium">✅ {fileName}</p>}
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50" ref={chatRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`mb-6 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[75%] px-6 py-4 rounded-3xl ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow border'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <p className="text-blue-600 italic">Grok is thinking...</p>}
            </div>

            <div className="p-6 bg-white border-t">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask anything about health or your report..."
                  className="flex-1 border border-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-10 py-4 rounded-2xl font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;