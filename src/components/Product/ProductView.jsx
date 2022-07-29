import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import NumberFormat from 'react-number-format';

const ProductView = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const res = await fetch('http://localhost:5000/api/getProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const data = await res.json();

        if (data.status === 'ok') {
            setLoading(false);
            setProduct(data.product);
        }

        else {
            setLoading(true);
            setProduct(null);
            alert(data.status);
        }
    }

    return (
        <div className="container my-3">
            {
                loading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '800px' }}>
                        <CircleLoader loading={loading} size={50} />
                        <span className="ml-3 font-weight-bold">Loading</span>
                    </div>
                )
            }

            {
                !loading && (
                    <div className="row">
                        <div className="col-8">
                            <h1>{product.name} &ndash; <small>Model#: {product.model}</small></h1>
                            <p className="text-secondary">{product.category}</p>
                            <p>Description: {product.description}</p>
                            <p>Price:
                                <NumberFormat
                                    className='text-danger font-weight-bold'
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    value={product.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'PKR '} />
                            </p>
                        </div>
                        <div className="col-4">
                            <h4>Image Preview</h4>
                            <img src={product.image} alt={product.name} className="img-fluid" />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductView;