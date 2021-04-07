import React, { Component } from 'react';

class Product extends Component {
	render() {
		return (
			<div className="col-sm-4">
				<div className="card" style={{maxWidth: '320px', height: '320px'}}>
					<img
                        style={{display : 'inline-block', height : '200px'}}
						className="card-img-top"
						src={this.props.product_picture}
						alt=""
					/>
					<div className="card-body">
						<h5 className="card-title">{this.props.product_name}</h5>
						<h5 className="card-title">
							{this.props.product_price}
						</h5>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;
