import { useState, useEffect } from 'react';
// import React from 'react';

function Login() {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);

    const [person, setPerson] = useState({
        name: 'Awais',
        age: 20,
        country: 'England',
        city: 'London',
        day: 'Thursday'
    });

    const [student, setStudent] = useState([
        'Ali', 'Awais', 'Muaz', 'Bilal', 'John'
    ]);

    const [employee, setEmployee] = useState([
        { name: 'Ali', city: 'Lahore' },
        { name: 'Awais', city: 'Islamabad' },
        { name: 'Muaz', city: 'Lahore' },
        { name: 'Bilal', city: 'Karachi' },
        { name: 'John', city: 'Multan' },
    ]);


    const handleSignIn = () => {
        setName('Usman');
        setAge(21);

        setPerson({
            ...person,
            name: 'Ali',
            country: 'USA',
            time: 'night'
        })
    };

    const removeEmployee = (city) => {
        // const data = employee.filter(e => e.city !== 'Lahore');
        const data = employee.filter(e => e.city !== city);
        setEmployee(data);
    }

    useEffect(() => {
        console.log('I am Running');
        // }, []);
        // }, [name, age]);
    });

    return (
        <form className="container mt-5">
            <p>{student.join(', ')}</p>

            <ol>
                {
                    student.map((ab, i) => (
                        <li key={i}>{ab} - {i}</li>
                    ))
                }
            </ol>
            <h1></h1>
            <ul>
                {
                    employee.map((x, i) => (
                        <li key={i}>{x.name} is {i} in {x.city}</li>
                    ))
                }
            </ul>

            {
                name && (
                    <h3>{name} is {age} years old.</h3>
                )
            }

            <p>{person.name}</p>
            <p>{person.country}</p>
            <p>{person.age}</p>
            <p>{person.city}</p>
            <p>{person.day}</p>
            <p>{person.time}</p>
            <h1 className="text-center">Login</h1>
            <hr width="50" color="red" />
            <div className="form-group mt-5">
                <input type="email" className="form-control" placeholder="Email Address" />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" />
            </div>

            <button className="btn btn-primary btn-block mt-4" type="button" onClick={handleSignIn}>Sign In</button>
            <button className="btn btn-danger btn-block" type="button" onClick={() => removeEmployee('Islamabad')}>Remove</button>
        </form>
    );
}

export default Login;