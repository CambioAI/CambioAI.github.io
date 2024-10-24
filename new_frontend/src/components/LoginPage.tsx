import React, { useState } from 'react';
import './LoginPage.css';
const LoginPage = ({setIsLoggedIn}: {setIsLoggedIn: (isLoggedIn: boolean) => void}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setError('');
            setIsLoggedIn(true);
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default LoginPage;
