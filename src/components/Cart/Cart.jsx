import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoPhotoImage from '../../images/nophoto.jpg';

const Cart = () => {
    const cartSelector = useSelector((state) => state.cart);

    return (
        <div className="my-3 container-fluid">
            <h3 className="text-center">Shopping Cart</h3>
            <hr width="50" color="red" />

            <div className="mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartSelector.products.map((v, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img
                                            src={v.image ? v.image : NoPhotoImage}
                                            alt={v.name + ' Product'}
                                            height="100" />
                                    </td>
                                    <td>{v.name}</td>
                                    <td>
                                        <NumberFormat
                                            fixedDecimalScale={false}
                                            value={v.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'PKR. '} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} align="right">Total Quantity:</td>
                            <td className="font-weight-bold text-danger">{cartSelector.totalQuantity}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} align="right">Total Price:</td>
                            <td>
                                <NumberFormat
                                    className='text-danger font-weight-bold'
                                    fixedDecimalScale={false}
                                    value={cartSelector.totalPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'PKR. '} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} align="right">
                                <Link to={"/place-order"}>
                                    <button className="btn btn-info">Proceed to Checkout</button>
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Cart;