import React, { useState, useEffect, useRef } from 'react';

const ChatBox = ({ riderName, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: `Hi! I'm ${riderName}. I'm currently near your location. Please prepare your payment.`, sender: 'rider', time: 'Just now' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll logic
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user', time: 'Sent' };
        
        // I-update ang messages state gamit ang functional update para iwas sa bugs
        setMessages(prev => [...prev, userMsg]);
        const userText = input.toLowerCase();
        setInput('');

        // Simulan ang "typing" animation
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            
            // DEFAULT RESPONSE kung hindi niya maintindihan
            let riderResponse = "Pasensya na po, medyo ma-traffic lang. Malapit na po ako!";

            // --- SMART KEYWORD DETECTION ---
            if (userText.includes("hello") || userText.includes("hi") || userText.includes("poy") || userText.includes("kuya")) {
                riderResponse = `Hello po! Ako si ${riderName}, ang rider niyo. May itatanong po ba kayo tungkol sa delivery?`;
            } 
            else if (userText.includes("saan") || userText.includes("nasaan") || userText.includes("where")) {
                riderResponse = "Nasa kanto na po ako, mga 2-3 blocks away na lang po sa inyo.";
            } 
            else if (userText.includes("bayad") || userText.includes("payment") || userText.includes("gcash") || userText.includes("magkano")) {
                riderResponse = "Sige po, paki-ready na lang po ang exact amount o screenshot ng payment kung GCash. Salamat!";
            } 
            else if (userText.includes("salamat") || userText.includes("thank") || userText.includes("tnx")) {
                riderResponse = "Walang anuman po! Ingat po tayo lagi.";
            } 
            else if (userText.includes("wait") || userText.includes("sandali") || userText.includes("teka")) {
                riderResponse = "Sige po, no rush. Hintayin ko po kayo sa tapat ng address niyo. Ride safe po!";
            }
            else if (userText.includes("okay") || userText.includes("ok") || userText.includes("sige")) {
                riderResponse = "Copy po! See you in a bit.";
            }

            const reply = {
                id: Date.now() + 1,
                text: riderResponse,
                sender: 'rider',
                time: 'Just now'
            };
            setMessages(prev => [...prev, reply]);
        }, 2000); // 2 seconds delay
    };

    return (
        <div className="position-fixed bottom-0 end-0 m-3 shadow-lg border-0 animate__animated animate__slideInUp animate__faster"
            style={{ zIndex: 10000, width: '350px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#fff' }}>

            {/* --- HEADER --- */}
            <div className="p-3 d-flex justify-content-between align-items-center text-white shadow-sm"
                style={{ backgroundColor: '#b0926a' }}>
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center me-2 fw-bold"
                            style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
                            {riderName ? riderName.charAt(0) : 'R'}
                        </div>
                        <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
                            style={{ width: '12px', height: '12px' }}></span>
                    </div>
                    <div>
                        <div className="fw-bold small">{riderName}</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>
                            {isTyping ? "Rider is typing..." : "Online | Courier Partner"}
                        </div>
                    </div>
                </div>
                <button className="btn btn-sm text-white p-0 border-0" onClick={onClose}>
                    <i className="bi bi-x-circle-fill fs-5"></i>
                </button>
            </div>

            {/* --- CHAT BODY --- */}
            <div className="p-3" style={{ height: '320px', overflowY: 'auto', backgroundColor: '#fdfaf6' }}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`p-2 px-3 shadow-sm small ${msg.sender === 'user' ? 'text-white' : 'text-dark'}`}
                            style={{
                                maxWidth: '85%',
                                borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                                backgroundColor: msg.sender === 'user' ? '#b0926a' : '#fff',
                                border: msg.sender === 'user' ? 'none' : '1px solid #eee'
                            }}>
                            {msg.text}
                            <div className={`text-end mt-1 ${msg.sender === 'user' ? 'text-white-50' : 'text-muted'}`}
                                style={{ fontSize: '0.55rem' }}>
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator Animation */}
                {isTyping && (
                    <div className="d-flex justify-content-start mb-3">
                        <div className="bg-white p-2 px-3 rounded-4 shadow-sm border border-light">
                            <span className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status"></span>
                            <span className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status"></span>
                            <span className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status"></span>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* --- INPUT FIELD --- */}
            <form className="p-3 bg-white border-top d-flex gap-2" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="form-control form-control-sm border-0 bg-light rounded-pill px-3"
                    placeholder="Type 'Hello' to start..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    disabled={!input.trim()}
                    className="btn btn-sm rounded-circle text-white shadow-sm d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: '#b0926a', width: '35px', height: '35px', border: 'none' }}>
                    <i className="bi bi-send-fill" style={{ fontSize: '0.9rem' }}></i>
                </button>
            </form>
            {/* --- QUICK REPLIES --- */}
<div className="px-3 pb-2 d-flex gap-2 overflow-x-auto" style={{ whiteSpace: 'nowrap' }}>
    {["Nasaan na po?", "Salamat!", "Wait po."].map((text) => (
        <button 
            key={text}
            onClick={() => handleSendMessage({ preventDefault: () => {}, target: { value: text } })} // Manual trigger logic
            className="btn btn-outline-secondary btn-sm rounded-pill"
            style={{ fontSize: '0.7rem', borderColor: '#eee' }}
        >
            {text}
        </button>
    ))}
</div>
        </div>
    );
};

export default ChatBox;