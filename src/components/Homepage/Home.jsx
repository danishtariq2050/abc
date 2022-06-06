import HomeBanner from '../../images/home.jpg';
import './Home.css';
import React from 'react';


// string          alphanumeric means alphabets, numbers and symbols
// number
// boolean          true or false


function Home() {
    const title = 'Welcome to Shop';
    const review = 30;
    const num1 = 40;
    const num2 = 3;
    let mylink = 'https://www.google.com/';
    let tagline = 'Come with Confidence';
    let tagline2 = 'and Go with Satisfaction';
    let tagline3 = ` and ${tagline}`;

    let person = {
        'name': 'Ali',
        'fatherName': 'Owais',
        'age': 21,
        'city': 'Lahore'
    };

    let person2 = {
        'name': 'Ahmad',
        'fatherName': 'Umar',
        'age': 30,
        'city': 'Islamabad'
    };

    let name = 'Ali';
    let fatherName = 'Owais';
    let age = 21;
    let city = 'Islamabad';

    name = 'Usman';
    name = 74;
    name = true;

    let name1 = 'Ahmad';

    const myStyle = {
        color: 'yellow',
        fontSize: '25px',
        textAlign: 'center'
    }

    // function can be used to reuse the code

    // function definition
    // func invoke / call

    // function onSubmit() {
    //     console.log('Test Running');
    //     console.log(name1);
    // }

    // let value = 10;
    // getter and setter
    const [value, setValue] = React.useState(0);

    const onSubmit = () => {
        console.log('Test Running');
        console.log(name1);
    }

    const clickGoogle = (a) => {
        console.log(`Google ${a} is Running`);
    }

    const calculateSum = (num1, num2) => {
        setValue(num1 + num2)
        console.log('Answer is: ' + value);
    }

    return (
        <>
            <img className='banner' src={HomeBanner} alt="Home Banner" onClick={() => calculateSum(12, 8)} />
            <hr />

            <div className='container-fluid'>
                <button className='btn btn-success' onClick={onSubmit}>Click Me</button>
                <button className='btn btn-success' onClick={() => clickGoogle('Ali')}>Click Google</button>


                {value}

                <h3 style={myStyle}>Dynamic Values</h3>
                <p style={{
                    color: 'red',
                    fontSize: '20px'
                }}>{title}</p>
                <p style={myStyle}>{tagline + tagline2 + tagline3}</p>
                <p>We have {review} reviews</p>
                <p><a href={mylink}>Google</a></p>
                <p>{15 - 7}</p>
                <p>Multiplication of {num1} and {num2} = {num1 * num2}</p>
                <p>{Math.random()}</p>
                <hr />
                <p>{person.name}</p>
                <p>{person2.name}</p>
            </div>
        </>
    );
}

export default Home;