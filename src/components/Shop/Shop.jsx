import { Component } from "react";
import '../Dashboard/style.css';
import NoPhotoImage from '../../images/nophoto.jpg';
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            priceRange: {
                min: 0,
                max: 0
            },
            priceError: '',
            // date: new Date().toLocaleString(),
            timeLeft: new Date().toLocaleTimeString(),
            products: [],
        });

        console.log('Constructor');

        this.incre = this.incre.bind(this);
        this.decre = this.decre.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.addInCart = this.addInCart.bind(this);
    }

    async getProducts() {
        const res = await fetch('http://localhost:5000/api/getProducts', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });

        const data = await res.json();

        if (data.status === 'ok') {
            this.setState({
                products: data.product
            });
        }
    }

    decre(flag) {
        const { priceRange } = this.state;
        switch (flag) {
            case 'min':
                if (priceRange.min === 0) {
                    this.setState({
                        priceError: 'Minimum Price Range will be 0'
                    })
                }
                else {
                    this.setState({
                        priceRange: {
                            ...priceRange,
                            min: priceRange.min - 1
                        }
                    })
                }
                break;

            case 'max':
                if (priceRange.max === 0) {
                    this.setState({
                        priceError: 'Minimum Price Range will be 0'
                    })
                }
                else {
                    this.setState({
                        priceRange: {
                            ...priceRange,
                            max: priceRange.max - 1
                        }
                    })
                }
                break;
        }

    }

    incre(flag) {
        const { priceRange } = this.state;

        switch (flag) {
            case 'min':
                this.setState({
                    priceRange: {
                        ...priceRange,
                        min: priceRange.min + 1
                    },
                    priceError: ''
                });
                break;

            case 'max':
                this.setState({
                    priceRange: {
                        ...priceRange,
                        max: priceRange.max + 1
                    },
                    priceError: ''
                });
                break;
        }
    }

    componentDidMount() {
        console.log('Component didmount');
        setTimeout(() => {
            this.setState({
                timeLeft: new Date().toLocaleTimeString()
            })
        }, 100)

        this.getProducts();
    }

    componentWillUnmount() {
        console.log('Component Unmount');
    }

    componentDidUpdate(prevProps, prevState) {
        const { priceRange } = this.state;

        console.log('Component DidUpdate');
        if (prevState.priceRange.min !== priceRange.min) {
            console.log('oldPriceRange', prevState.priceRange.min);
            console.log('newPriceRange', priceRange.min);
        }
        setTimeout(() => {
            this.setState({
                timeLeft: new Date().toLocaleTimeString()
            })
        }, 100)
    }

    addInCart(productData) {
        const data = {
            totalQuantity: 1,
            totalPrice: productData.price,
            product: productData
        }
    }

    render() {
        const { timeLeft, priceRange, priceError, products } = this.state;

        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-10 mt-2 mb-4">
                        <h3 className="text-center font-weight-bold">Shop</h3>
                    </div>
                    <div className="col-2 mt-2 mb-4">
                        <h3 className="text-center font-weight-bold text-danger">
                            Time Left: <span className="font-italic">{timeLeft}</span>
                        </h3>
                    </div>
                    <div className="col-3">
                        <h4>Categories</h4>
                        <ul>
                            <li>Category A</li>
                            <li>Category B</li>
                            <li>Category C</li>
                        </ul>

                        <h4>Price Range</h4>
                        <div className="d-flex flex-row">
                            <div>
                                <button className="btn btn-secondary btn-sm" onClick={() => this.decre('min')}>-</button>
                                <span className="mx-4">PKR. {priceRange.min}</span>
                                <button className="btn btn-secondary btn-sm" onClick={() => this.incre('min')}>+</button>
                            </div>
                            <div className="mx-4">&mdash;</div>
                            <div>
                                <button className="btn btn-secondary btn-sm" onClick={() => this.decre('max')}>-</button>
                                <span className="mx-4">PKR. {priceRange.max}</span>
                                <button className="btn btn-secondary btn-sm" onClick={() => this.incre('max')}>+</button>
                            </div>
                        </div>
                        <small className="text-danger font-weight-bold">{priceError}</small>
                    </div>
                    <div className="col">
                        <div>
                            <h4>Products</h4>
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
                                                        <button type="button" className="btn btn-link" onClick={() => this.addInCart(v)}>
                                                            <i className="fa fa-shopping-cart text-primary"></i>
                                                        </button>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;