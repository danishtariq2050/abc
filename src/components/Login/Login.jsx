import { useState, useEffect } from 'react';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleSignIn = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (data.userFound) {
            alert('User is Authorized');
            console.log(data);
        }

        else {
            alert('Wrong Email / Password');
        }
    };

    return (
        <form className="container mt-5" onSubmit={handleSignIn}>
            <h1 className="text-center">Login</h1>
            <hr width="50" color="red" />
            <div className="form-group mt-5">
                <input type="email" className="form-control" placeholder="Email Address" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>

            <button className="btn btn-primary btn-block mt-4">Sign In</button>
        </form>
    );
}

export default Login;