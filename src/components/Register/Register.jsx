import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        pass: '',
        conpass: '',
        country: ''
    });

    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(false);
    const [errorClass, setErrorClass] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((x) => { return x.json() })
            .then((data) => {
                setCountries(data);
            });
    }, []);

    const registerUser = (e) => {
        e.preventDefault();
        setError(user.pass !== user.conpass);
        setErrorClass(user.pass !== user.conpass ? "is-invalid" : "is-valid");

        navigate('/about');


        // user.pass !== user.conpass ? setError(true) : setError(false);


        // if (user.pass !== user.conpass) {
        //     setError(true);
        // }

        // else {
        //     setError(false);
        // }

        // console.log('this function calls')
        // clearUser();
    }

    const clearUser = () => {
        setUser({
            name: '',
            email: '',
            pass: '',
            conpass: '',
            country: ''
        })
    }

    return (
        <>
            <form className="container mt-5" onSubmit={registerUser}>
                <h1 className="text-center">Register</h1>
                <hr width="50" color="red" />

                <div className="form-group mt-5">
                    <input type="text" className="form-control" placeholder="Full Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email Address" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={user.pass} onChange={(e) => {
                        setUser({ ...user, pass: e.target.value });
                        setError(e.target.value !== user.conpass);
                        setErrorClass(e.target.value !== user.conpass ? "is-invalid" : "is-valid");
                    }} />
                </div>

                <div className="form-group">
                    <input type="password" className={"form-control " + errorClass} placeholder="Confirm Password" value={user.conpass} onChange={(e) => {
                        setUser({ ...user, conpass: e.target.value });
                        setError(user.pass !== e.target.value);
                        setErrorClass(user.pass !== e.target.value ? "is-invalid" : "is-valid");
                    }} />
                </div>

                <div className="form-group">
                    <select className="form-control mb-3" value={user.country} onChange={(e) => setUser({ ...user, country: e.target.value })}>
                        <option value=''>Select Country</option>
                        {
                            countries
                                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                                .map((v, i) => (
                                    <option key={i}>{v.name.common}</option>
                                ))
                        }
                    </select>
                </div>

                {
                    error && (
                        <h2 className="text-center text-danger my-3">Password and Confirm Password is not Same!</h2>
                    )
                }

                <button className="btn btn-primary btn-block mt-4">Sign Up</button>
            </form>

            <div>
                <hr />
                <h2>Output</h2>
                <hr />
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.pass}</p>
                <p>{user.conpass}</p>
                <p>{user.country}</p>
            </div>
        </>

    );
}

export default Register;