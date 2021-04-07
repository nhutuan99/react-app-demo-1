import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Product from './Product';
import axios from 'axios';

const getProductData = () => {
	return axios.get('/getData').then((res) => res.data);
};
const addProductAction = (product_name, product_price, product_picture) =>
	(axios
		.post('/add', { product_name, product_price, product_picture })
		.then((resp) => resp.data));

class App extends Component {
	// eslint-disable-next-line no-useless-constructor
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			product_name: '',
			product_price: '',
			product_picture: ''
		};
	}

	componentWillMount() {
		if (this.state.data == null) {
			getProductData().then((res) => {
				this.setState({
					data: res
				});
			});
		}
	}

	printData = () => {
		if (this.state.data !== null) {
			return this.state.data.map((value, key) => (
				<Product
					key={key}
					product_name={value.product_name}
					product_price={value.product_price}
					product_picture={value.product_picture}
				/>
			));
		}
	};

	isChange = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleClick = () => {
		var { product_name, product_price, product_picture } = this.state;
		var dataTemp = [];
    var item = {};
    item.product_name = product_name;
    item.product_price = product_price;
    item.product_picture = product_picture;

    dataTemp = this.state.data;
    if(item.product_name !== ''){
      dataTemp.push(item);
      this.setState({
        data:dataTemp
      });
    }
    

    addProductAction(
			product_name,
			product_price,
			product_picture
		).then((response) => console.log(response));
	};
	render() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col">
              <div className="row">
                {this.printData()}
              </div>
            </div>
						<div className="col-4">
							<div className="row">
								<div className="col-12">
								
									<form>
										<div className="form-group">
											<label htmlFor="product_name">Product Name</label>
											<input
												onChange={(e) => this.isChange(e)}
												type="text"
												name="product_name"
												id="product_name"
												className="form-control"
												placeholder
												aria-describedby="name_text"
											/>
											<small id="name_text" className="text-muted">
												Input product name
											</small>
										</div>
										<div className="form-group">
											<label htmlFor="product_name">Product Price</label>
											<input
												onChange={(e) => this.isChange(e)}
												type="text"
												name="product_price"
												id="product_price"
												className="form-control"
												placeholder
												aria-describedby="name_text"
											/>
											<small id="name_text" className="text-muted">
												Input product price
											</small>
										</div>
										<div className="form-group">
											<label htmlFor="product_name">Product Picture</label>
											<input
												onChange={(e) => this.isChange(e)}
												type="text"
												name="product_picture"
												id="product_picture"
												className="form-control"
												placeholder
												aria-describedby="name_text"
											/>
											<small id="name_text" className="text-muted">
												Input product picture
											</small>
										</div>
										<button
											onClick={() => this.handleClick()}
											type="reset"
											className="btn btn-success"
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
