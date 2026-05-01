import React, { useState } from 'react';

const Login = ({ onLogin, onSwitch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 text-center" style={{ maxWidth: '450px', width: '100%' }}>
                
                <div className="d-flex justify-content-center mb-4">
                    <img 
                        src={process.env.PUBLIC_URL + '/logo1.png'} 
                        alt="Glow Beauty Store Logo" 
                        style={{ 
                        width: '100%',        
                        maxWidth: '400px',    
                        height: 'auto', 
                         objectFit: 'contain' 
                        }}
                        className="img-fluid"    
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control rounded-pill py-3 border-light bg-light shadow-sm"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control rounded-pill py-3 border-light bg-light shadow-sm"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm mb-3"
                        style={{ backgroundColor: '#b0926a' }} // Coffee/Gold theme color
                    >
                        ENTER STORE
                    </button>
                </form>

                <p className="small text-muted mt-2 mb-0">
                    New to Glow Beauty? {' '}
                    <span
                        className="fw-bold"
                        style={{ 
                            cursor: 'pointer', 
                            textDecoration: 'underline',
                            color: '#b0926a' 
                        }}
                        onClick={onSwitch}
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;