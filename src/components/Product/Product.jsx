import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
    const { id } = useParams();
    const initialProduct = {
        name: '',
        model: '',
        description: '',
        price: '',
        image: '',
        category: '',
    }

    const [product, setProduct] = useState(initialProduct);
    const [pageTitle, setPageTitle] = useState('Create New Product');
    const navigateTo = useNavigate();

    useEffect(() => {
        if (id) {
            setPageTitle('Edit Product');
            fetchProduct();
        }
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
            setProduct(data.product);
        }
    }

    const saveProduct = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/saveProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await res.json();

        if (data.status === 'ok') {
            navigateTo('/dashboard');
            alert(data.msg);
        }

        else {
            alert(data.msg);
        }
    }

    const editProduct = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/updateProduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await res.json();

        if (data.msg === 'ok') {
            navigateTo('/products/' + id);
            alert(data.status);
        }

        else {
            alert(data.status);
        }
    }

    const convertImage = (e) => {
        const file = e.target.files[0];
        const convertFile = new FileReader();

        convertFile.onloadend = () => {
            setProduct({ ...product, image: convertFile.result })
        }

        convertFile.readAsDataURL(file);
    }

    return (
        <div>
            <h3 className="my-3 text-center">{pageTitle}</h3>
            <hr width="100" color="red" />

            <form className="container" onSubmit={id ? editProduct : saveProduct}>
                <div className="row">
                    <div className={id ? "col-8" : "col-12"}>
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input type="text" placeholder="Name of Product" className="form-control" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Category:</label>
                            <input type="text" placeholder="Category of Product" className="form-control" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Product Model:</label>
                            <input type="text" placeholder="Model of Product" className="form-control" value={product.model} onChange={(e) => setProduct({ ...product, model: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Price:</label>
                            <input type="number" min="0" placeholder="Price" className="form-control" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea placeholder="Product Details" className="form-control" rows={5} style={{ resize: 'none' }} onChange={(e) => setProduct({ ...product, description: e.target.value })}>{product.description}</textarea>
                        </div>

                        <div className="form-group">
                            <label>Image:</label>
                            <input type="file" className="form-control-file" accept="image/*" onChange={(e) => convertImage(e)} />
                        </div>

                        <button className="btn btn-success btn-block mt-5">
                            {id ? 'Edit' : 'Save'} Product
                        </button>
                    </div>

                    {
                        id && (
                            <div className="col-4">
                                <h4>Image Preview:</h4>
                                <img src={product.image} alt={product.name} className="img-thumbnail" />
                            </div>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default AddProduct;