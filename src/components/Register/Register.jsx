import { useState } from "react";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <>
            <form className="container mt-5">
                <h1 className="text-center">Register</h1>
                <hr width="50" color="red" />

                <div className="form-group mt-5">
                    <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password" />
                </div>

                <button className="btn btn-primary btn-block mt-4">Sign Up</button>
            </form>

            <div>
                <hr />
                <h2>Output</h2>
                <hr />
                <p>{name}</p>
                <p>{email}</p>
            </div>
        </>

    );
}

export default Register;