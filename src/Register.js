import React, { useState } from 'react';

const Register = ({ onRegister, onSwitch }) => {
    // Tinanggal ang 'name' field, 'username' na lang ang main identifier
    const [formData, setFormData] = useState({ 
        username: '', 
        password: '', 
        confirmPassword: '' 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        onRegister(formData);
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 text-center" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="fw-bold mb-4" style={{ color: '#b0926a' }}>Create Account</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control rounded-pill py-3 border-light bg-light shadow-sm" 
                            placeholder="Username" 
                            required 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control rounded-pill py-3 border-light bg-light shadow-sm" 
                            placeholder="Password" 
                            required 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <input 
                            type="password" 
                            className="form-control rounded-pill py-3 border-light bg-light shadow-sm" 
                            placeholder="Confirm Password" 
                            required 
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm mb-3" 
                        style={{ backgroundColor: '#b0926a' }}
                    >
                        SIGN UP
                    </button>
                </form>

                <p className="small text-muted">
                    Already have an account? {' '}
                    <span 
                        className="fw-bold"
                        style={{ 
                            cursor: 'pointer', 
                            textDecoration: 'underline',
                            color: '#b0926a' 
                        }}
                        onClick={onSwitch}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;