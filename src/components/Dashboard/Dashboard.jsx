import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useState } from "react";
import NumberFormat from 'react-number-format';
import NoPhotoImage from '../../images/nophoto.jpg';
import './style.css';

const Dashboard = () => {

    const navigateTo = useNavigate();
    const [products, setProducts] = useState([]);
    const [productView, setProductView] = useState('grid');

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

    const changeProductView = (view) => {
        setProductView(view);
    }

    return (
        <div className="my-3 container-fluid">
            <h3 className="text-center">Welcome to Dashboard</h3>
            <hr width="50" color="red" />

            <div className="mt-5">
                <div className="d-flex flex-row justify-content-end mb-3">
                    <div class="btn-group mr-3">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            disabled={productView === 'list'}
                            onClick={() => changeProductView('list')}>
                            <i class="fas fa-list"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            disabled={productView === 'grid'}
                            onClick={() => changeProductView('grid')}>
                            <i class="fas fa-grip-horizontal"></i>
                        </button>
                    </div>
                    <Link to={"/addProduct"}>
                        <button className="btn btn-outline-success">Add New Product</button>
                    </Link>
                </div>

                {
                    productView === 'grid' && (
                        <div className="row">
                            {
                                products.map((v, i) => (
                                    <div className="col-3" key={i}>
                                        <div class="image-container">
                                            <img
                                                src={v.image ? v.image : NoPhotoImage}
                                                alt={v.name + ' Product'}
                                                className="img-fluid h-50 image" />
                                            <div class="overlay">
                                                <div class="icons">
                                                    <Link to={"/products/" + v._id}>
                                                        <i className="fas fa-eye text-primary"></i>
                                                    </Link>
                                                    <Link to={"/products/" + v._id + "/edit"}>
                                                        <i className="fas fa-edit mx-4 text-warning"></i>
                                                    </Link>
                                                    <Link to={"/products/" + v._id + "/delete"}>
                                                        <i className="fas fa-trash text-dark"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <hr />
                                        <h4>{v.name} &mdash; {v.model}</h4>
                                        <small>{v.category}</small>
                                        <p className="text-right">
                                            <NumberFormat
                                                className='text-danger font-weight-bold'
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                value={v.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'PKR '} />
                                        </p>
                                        <p>{v.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

                {
                    productView === 'list' && (
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
                    )
                }
            </div>
        </div >
    )
}

export default Dashboard;