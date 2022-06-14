import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container">
            <h2 className="text-center">Page Not Found!!!</h2>
            <Link to="/">Back to Home Page</Link>
        </div>
    )
}

export default NotFound;