import { useState } from 'react';
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from './LoadingIndicator';

function Form({ route, method }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // validação simples
    if (method !== 'login' && !email) {
        alert("Por favor, informe um e-mail válido!");
        setLoading(false);
        return;
    }

    try {
        const payload = method === 'login'
            ? { username, password }
            : { username, password, email };

        const res = await api.post(route, payload);

        if (method === 'login') {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate('/');
        } else {
            navigate('/login');
        }
    } catch (error) {
        // mostra mensagem do backend, se houver
        console.log(error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
}

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>{name}</h1>
            <input
                className='form-input'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />
            <input
                className='form-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />

            {method !== 'login' && (
            <input
                className='form-input'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail'
            />
            )}
            
            {loading && <LoadingIndicator />}
            <button className='form-button' type='submit'>
                {name}
            </button>
        </form>
    )
}

export default Form