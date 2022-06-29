import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {

    const navigateTo = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = jwt_decode(token);;

            if (user) {
                getProducts();
            }

            else {
                localStorage.removeItem('token');
                navigateTo('/login');
            }
        }

        else {
            navigateTo('/login');
        }

    }, [])

    const getProducts = async () => {
        const res = await fetch('http://localhost:5000/api/getProducts', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });

        const data = await res.json();

        if (data.status === 'ok') {
            setProducts(data.product);
        }
    }

    return (
        <div className="my-3 container-fluid">
            <h3 className="text-center">Welcome to Dashboard</h3>
            <hr width="50" color="red" />

            <div className="mt-5">
                <Link to={"/addProduct"}>Add New Product</Link>

                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Product Name</th>
                            <th>Model</th>
                            <th>Category</th>
                            <th>Price (PKR.)</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((v, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{v.name}</td>
                                    <td>{v.model}</td>
                                    <td>{v.category}</td>
                                    <td>{v.price}</td>
                                    <td>{v.description}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;