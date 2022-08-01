import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [admin, setAdmin] = useState({
        email: '',
        password: ''
    });

    const navigateTo = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        });

        const data = await res.json();

        if (data.adminFound) {
            localStorage.setItem('admin-token', data.admin);
            navigateTo('/dashboard');
        }

        else {
            alert('Wrong Admin Email / Password');
        }
    };

    return (
        <form className="container mt-5" onSubmit={handleSignIn}>
            <h1 className="text-center">Admin Login</h1>
            <hr width="50" color="red" />
            <div className="form-group mt-5">
                <input type="email" className="form-control" placeholder="Email Address" value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
            </div>

            <button className="btn btn-primary btn-block mt-4">Admin Login</button>
        </form>
    );
}

export default Login;