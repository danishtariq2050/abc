function Login() {
    return (
        <form className="container mt-5">
            <h1 className="text-center">Login</h1>
            <hr width="50" color="red" />
            <div className="form-group mt-5">
                <input type="email" className="form-control" placeholder="Email Address" />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" />
            </div>

            <button className="btn btn-primary btn-block mt-4">Sign In</button>
        </form>
    );
}

export default Login;