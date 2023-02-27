import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Axios from 'axios';

class OrderCheckOut extends Component {
    handleToken = (token, amount) => {
        const abc = 125000;
        const data = { token, amount: abc };
        Axios.post("http://localhost:5000/checkout", data).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="container-fluid mt-5">
                <div>
                    <h3 className='text-center'>Card Payment</h3>
                    <hr />
                    <div className="stripe-container">
                        <StripeCheckout
                            stripeKey="pk_test_51L2HrjHP6ReNoGQNFDPobteMe3poRYj959psUpnPm4aUKnx2C48fSutNbpw4CRJ5hBlG8qrZM5YnVvj3Fm8CDB6800XhsJbFMk"
                            name="Three Comma Co."
                            description="Big Data Stuff"
                            ComponentClass="div"
                            panelLabel="Give Money"
                            amount={1000000}
                            currency="USD"
                            locale="eng"
                            email="info@vidhub.co"
                            shippingAddress
                            billingAddress={false}
                            zipCode={false}
                            allowRememberMe
                            token={this.handleToken}
                        />
                    </div>
                </div>
            </div >
        );
    }
}

export default OrderCheckOut;