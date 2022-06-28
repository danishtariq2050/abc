import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {

    const navigateTo = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = jwt_decode(token);;

            if (user) {

            }

            else {
                localStorage.removeItem('token');
                navigateTo('/');
            }
        }

        else {
            navigateTo('/');
        }

    }, [])

    return (
        <div className="my-3">
            <h3 className="text-center">Welcome to Dashboard</h3>
            <hr width="50" color="red" />

            <div className="mt-5"></div>
        </div>
    )
}

export default Dashboard;