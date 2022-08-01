import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const [admin, setAdmin] = useState(initialValues);
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const registerAdmin = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        });

        const data = await res.json();
        setMsg(data.msg);

        if (data.status === 'ok') {
            navigate('/admin/login');
        }
    }

    return (
        <>
            <form className="container mt-5" onSubmit={registerAdmin}>
                <h1 className="text-center">Register Admin</h1>
                <hr width="50" color="red" />

                <div className="form-group mt-5">
                    <input type="text" className="form-control" placeholder="Full Name" value={admin.name} onChange={(e) => setAdmin({ ...admin, name: e.target.value })} />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email Address" value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
                </div>

                <button className="btn btn-primary btn-block mt-4">Register Admin</button>
            </form>

            {
                msg && (
                    <div className="alert alert-success alert-dismissible m-5">
                        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Success!</strong> {msg}.
                    </div>
                )
            }
        </>

    );
}

export default Register;