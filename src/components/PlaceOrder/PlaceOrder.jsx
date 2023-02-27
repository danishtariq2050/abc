import { useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const cartSelector = useSelector((state) => state.cart);
    const defaultDetails = {
        name: '',
        email: '',
        mobileNo: '',
        address: '',
        deliveryDate: ''
    }
    const [details, setDetails] = useState(defaultDetails);
    const navigateTo = useNavigate();

    const saveOrder = async (e) => {
        e.preventDefault();
        const orderDetails = {
            ...details,
            totalPrice: cartSelector.totalPrice,
            totalQuantity: cartSelector.totalQuantity,
            products: cartSelector.products
        };

        const res = await fetch('http://localhost:5000/api/saveOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        });

        const data = await res.json();

        if (data.status === 'ok') {
            navigateTo('/checkout');
            alert(data.msg);
        }

        else {
            alert(data.msg);
        }
    }

    return (
        <div className="my-3 container-fluid">
            <h3 className="text-center">Order Details</h3>
            <hr width="50" color="red" />

            <div className="mt-5">
                <div className="row">
                    <div className="col-9">
                        <form onSubmit={saveOrder}>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input type="text" placeholder="Full Name" className="form-control" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" placeholder="Email Address" className="form-control" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Mobile Number:</label>
                                <input type="text" placeholder="Contact Number" className="form-control" value={details.mobileNo} onChange={(e) => setDetails({ ...details, mobileNo: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Address:</label>
                                <input type="text" placeholder="Permanent Address" className="form-control" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Delivery Date:</label>
                                <input type="date" placeholder="Delivery Date" className="form-control" value={details.deliveryDate} onChange={(e) => setDetails({ ...details, deliveryDate: e.target.value })} />
                            </div>

                            <button className="btn btn-success mt-5">
                                Save Order
                            </button>
                        </form>
                    </div>

                    <div className="col border py-3">
                        <h5 className="text-center">Order Details</h5>
                        <hr width="50" color="red" />
                        <div>
                            <span className="mr-2">Total Quantity:</span>
                            <span className="font-weight-bold text-danger">{cartSelector.totalQuantity}</span>
                        </div>
                        <div>
                            <span className="mr-2">Total Price:</span>
                            <NumberFormat
                                className='text-danger font-weight-bold'
                                fixedDecimalScale={false}
                                value={cartSelector.totalPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'PKR. '} />

                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default PlaceOrder;