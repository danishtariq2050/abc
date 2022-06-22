import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const initialValues = {
        name: '',
        email: '',
        pass: '',
        conpass: '',
        country: ''
    };
    const [user, setUser] = useState(initialValues);

    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(false);
    const [errorClass, setErrorClass] = useState('');

    const [msg, setMsg] = useState('');



    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((x) => { return x.json() })
            .then((data) => {
                setCountries(data);
            });
    }, []);

    const registerUser = async (e) => {
        e.preventDefault();
        setError(user.pass !== user.conpass);
        setErrorClass(user.pass !== user.conpass ? "is-invalid" : "is-valid");

        let userValue = { ...user };
        delete userValue['conpass'];

        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userValue)
        });

        const data = await res.json();
        setMsg(data.msg);
        console.log(data);

        // const userValue = {
        //     name: user.name,
        //     email: user.email,
        //     pass: user.pass,
        //     country: user.country
        // };

        // console.log(user);
        // console.log(userValue);

        // navigate('/about');


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