import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';

import { getProductById } from '../../store/actions/actionCreators/productActions';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { addToCartAction } from '../../store/actions/actionCreators/cartActions';
import { getLoggedInUser } from '../../utils';

const ProductScreen = ({ history, match }) => {
	const loggedUser = getLoggedInUser();
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();
	const {
		isLoading,
		actionMessage,
		activeProduct: product,
	} = useSelector((store) => store.products);

	useEffect(() => {
		dispatch(getProductById(match.params.id));
	}, [match.params.id, dispatch]);

	const handleAddToCart = () => {
		if (!loggedUser) {
			return history.push(`/login?redirect=product/${product._id}`);
		}
		dispatch(addToCartAction({ id: product._id, quantity: +qty, history }));
	};

	if (isLoading) return <Loader />;

	if (actionMessage && actionMessage.type === 'error') {
		return (
			<>
				<Message variant='danger'>{actionMessage.message}</Message>
				<Button variant='danger' onClick={() => history.push('/')}>
					Go Home
				</Button>
			</>
		);
	}

	return (
		<>
			<Link
				to='#'
				onClick={() => history.go(-1)}
				className='btn btn-light btn-sm my-3 rounded'
			>
				<i className='fas fa-chevron-left mr-2'></i>Back
			</Link>
			{product && (<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} thumbnail />
				</Col>
				<Col md={12} xl={3} className='my-2 order-three'>
					<ListGroup style={{ overflow: 'hidden' }}>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating rating={product.rating} reviews={product.numReviews} />
						</ListGroup.Item>
						<ListGroup.Item>Price: &#8377;{Number(product.price).toLocaleString('en-IN')}</ListGroup.Item>
						<ListGroup.Item>{product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={6} xl={3} className='my-2'>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>&#8377;{Number(product.price).toLocaleString('en-IN')}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										<strong>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Qty:</Col>
										<Col>
											<Form.Control
												as='select'
												value={qty}
												onChange={(e) => setQty(e.target.value)}
												size='sm'
											>
												{[...Array(product.countInStock).keys()].map((id) => (
													<option key={id + 1} value={id + 1}>
														{id + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Row>
									<Col>
										<Button
											className='btn btn-block rounded'
											disabled={product.countInStock <= 0}
											onClick={handleAddToCart}
										>
											Add to Cart
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>)}
		</>
	);
};

export default ProductScreen;
