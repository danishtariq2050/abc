function Register() {
    return (
        <form className="container mt-5">
            <h1 className="text-center">Register</h1>
            <hr width="50" color="red" />

            <div className="form-group mt-5">
                <input type="text" className="form-control" placeholder="Full Name" />
            </div>

            <div className="form-group">
                <input type="email" className="form-control" placeholder="Email Address" />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" placeholder="Confirm Password" />
            </div>

            <button className="btn btn-primary btn-block mt-4">Sign Up</button>
        </form>
    );
}

export default Register;