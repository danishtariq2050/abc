import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const initialProduct = {
        name: '',
        model: '',
        description: '',
        price: '',
        image: '',
        category: '',
    }

    const [product, setProduct] = useState(initialProduct);
    const navigateTo = useNavigate();

    const handleProduct = async (e) => {
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
            <h3 className="my-3 text-center">Create New Product</h3>
            <hr width="100" color="red" />

            <form className="container" onSubmit={handleProduct}>
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

                <button className="btn btn-success btn-block mt-5">Save Product</button>
            </form>
        </div>
    )
}

export default AddProduct;