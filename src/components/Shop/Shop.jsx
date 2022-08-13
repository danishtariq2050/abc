import { Component } from "react";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            xyz: 12,
            abc: 'umair',
            country: 'India',
            priceRange: 0,
            priceError: '',
            date: new Date().toLocaleString(),
            timeLeft: new Date().toLocaleTimeString(),
        });

        console.log('Constructor');

        this.incre = this.incre.bind(this);
        this.decre = this.decre.bind(this);
    }

    decre() {
        if (this.state.priceRange === 0) {
            this.setState({
                priceError: 'Minimum Price Range will be 0'
            })
        }
        else {
            this.setState({
                priceRange: this.state.priceRange - 1
            })
        }
    }

    incre() {
        this.setState({
            priceRange: this.state.priceRange + 1,
            priceError: ''
        })
    }

    componentDidMount() {
        console.log('Component didmount');
        setTimeout(() => {
            this.setState({
                timeLeft: new Date().toLocaleTimeString()
            })
        }, 100)
    }

    componentWillUnmount() {
        console.log('Component Unmount');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DidUpdate');
        if (prevState.priceRange !== this.state.priceRange) {
            console.log('oldPriceRange', prevState.priceRange);
            console.log('newPriceRange', this.state.priceRange);
        }
        setTimeout(() => {
            this.setState({
                timeLeft: new Date().toLocaleTimeString()
            })
        }, 100)
    }

    render() {
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-10 mt-2 mb-4">
                        <h3 className="text-center font-weight-bold">Shop</h3>
                    </div>
                    <div className="col-2 mt-2 mb-4">
                        <h3 className="text-center font-weight-bold text-danger">
                            Time Left: <span className="font-italic">{this.state.timeLeft}</span>
                        </h3>
                    </div>
                    <div className="col-3">
                        <h4>Categories</h4>
                        <ul>
                            <li>Category A</li>
                            <li>Category B</li>
                            <li>Category C</li>
                            <li>{this.state.xyz}</li>
                            <li>{this.state.country}</li>
                            <li>{this.state.abc}</li>
                            <li>{this.state.date}</li>
                        </ul>

                        <h4>Price Range</h4>
                        <div>
                            <button className="btn btn-secondary btn-sm" onClick={() => this.decre()}>-</button>
                            <span className="mx-4">{this.state.priceRange}</span>
                            <button className="btn btn-secondary btn-sm" onClick={() => this.incre()}>+</button>
                        </div>
                        <small className="text-danger font-weight-bold">{this.state.priceError}</small>
                    </div>
                    <div className="col">
                        <div>
                            <h4>Discounted Products</h4>
                        </div>

                        <div>
                            <h4>Products</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;