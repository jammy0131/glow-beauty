import React, { useState, useEffect, useRef } from 'react';

const ChatBox = ({ riderName = "Rider", onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! I'm ${riderName}. Malapit na po ako sa location niyo. Paki-ready na lang po ang payment.`, sender: 'rider', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { 
      id: Date.now(), 
      text: text, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let riderResponse = "Pasensya na po, medyo ma-traffic lang. Malapit na po ako!";
      const userText = text.toLowerCase();

      if (userText.includes("hello") || userText.includes("hi")) {
        riderResponse = `Hello po! Ako si ${riderName}. May itatanong po ba kayo?`;
      } else if (userText.includes("nasaan") || userText.includes("saan")) {
        riderResponse = "Nasa kanto na po ako, mga 2-3 blocks away na lang.";
      } else if (userText.includes("bayad") || userText.includes("gcash") || userText.includes("magkano")) {
        riderResponse = "Sige po, paki-ready na lang ang payment o screenshot kung GCash. Salamat!";
      } else if (userText.includes("salamat") || userText.includes("thank")) {
        riderResponse = "Walang anuman po! Ingat po tayo lagi.";
      } else if (userText.includes("wait") || userText.includes("sandali")) {
        riderResponse = "Sige po, no rush. Hintayin ko po kayo sa labas.";
      } else if (userText.includes("okay") || userText.includes("ok") || userText.includes("sige")) {
        riderResponse = "Copy po! See you in a bit.";
      }

      const reply = {
        id: Date.now() + 1,
        text: riderResponse,
        sender: 'rider',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3 shadow-lg border-0 animate__animated animate__slideInUp animate__faster"
      style={{ 
        zIndex: 100, 
        width: '380px', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        backgroundColor: '#fff' 
      }}>

      {/* HEADER - Mas malaki ang padding */}
      <div className="p-3 d-flex justify-content-between align-items-center text-white shadow-sm"
        style={{ backgroundColor: '#b0926a' }}>
        <div className="d-flex align-items-center">
          <div className="position-relative">
            <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center me-3 fw-bold"
              style={{ width: '45px', height: '45px', fontSize: '1rem' }}>
              {riderName.charAt(0)}
            </div>
            <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
              style={{ width: '14px', height: '14px' }}></span>
          </div>
          <div>
            <div className="fw-bold" style={{ fontSize: '1rem' }}>{riderName}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
              {isTyping ? "Rider is typing..." : "Online | Courier Partner"}
            </div>
          </div>
        </div>
        <button className="btn btn-sm text-white p-0 border-0" onClick={onClose}>
          <i className="bi bi-x-circle-fill fs-4"></i>
        </button>
      </div>

      {/* CHAT BODY - Tinaasan ang height (400px) */}
      <div className="p-4" style={{ height: '400px', overflowY: 'auto', backgroundColor: '#fdfaf6' }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`p-3 px-3 shadow-sm ${msg.sender === 'user' ? 'text-white' : 'text-dark'}`}
              style={{
                maxWidth: '85%',
                fontSize: '0.9rem', // Mas malaking text
                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                backgroundColor: msg.sender === 'user' ? '#b0926a' : '#fff',
                border: msg.sender === 'user' ? 'none' : '1px solid #eee'
              }}>
              {msg.text}
              <div className={`text-end mt-1 ${msg.sender === 'user' ? 'text-white-50' : 'text-muted'}`}
                style={{ fontSize: '0.65rem' }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="d-flex justify-content-start mb-3">
            <div className="bg-white p-3 rounded-4 shadow-sm border border-light">
              <span className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status"></span>
              <span className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* QUICK REPLIES - Mas malalaking buttons */}
      <div className="px-3 py-3 bg-white d-flex gap-2 overflow-x-auto border-top" style={{ whiteSpace: 'nowrap' }}>
        {["Nasaan na po?", "Salamat!", "Wait po.", "Sige po."].map((text) => (
          <button
            key={text}
            onClick={() => sendMessage(text)}
            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
            style={{ fontSize: '0.8rem', borderColor: '#ddd', color: '#555' }}
          >
            {text}
          </button>
        ))}
      </div>

      {/* INPUT FIELD - Mas mataas na padding */}
      <form className="p-3 pb-4 bg-white d-flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control border-0 bg-light rounded-pill px-4"
          style={{ height: '45px' }}
          placeholder="Mag-chat kay kuya rider..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={!input.trim()}
          className="btn rounded-circle text-white shadow-sm d-flex align-items-center justify-content-center"
          style={{ backgroundColor: '#b0926a', width: '45px', height: '45px', border: 'none' }}>
          <i className="bi bi-send-fill" style={{ fontSize: '1.1rem' }}></i>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;