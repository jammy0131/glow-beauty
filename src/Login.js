import React from 'react';

export default function Login({ onLogin }) {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow">
                <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                    <input className="form-control mb-3" placeholder="Username" required />
                    <input type="password" className="form-control mb-3" placeholder="Password" required />
                    <button className="btn btn-dark w-100">Login</button>
                </form>
            </div>
        </div>
    );
}