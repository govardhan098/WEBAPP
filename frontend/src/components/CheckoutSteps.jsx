import React from 'react';
import { Nav, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Row className='m-0'>
			<Nav className='mb-3'>
				{step1 ? (
					<LinkContainer to='/login?redirect=shipping'>
						<Nav.Link>Sign In</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Sign in</Nav.Link>
				)}
				{step2 ? (
					<LinkContainer to='/shipping'>
						<Nav.Link>Shipping</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
				{step3 ? (
					<LinkContainer to='/order-summary'>
						<Nav.Link>Order Summary</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Order Summary</Nav.Link>
				)}
				{step4 ? (
					<LinkContainer to='/payment'>
						<Nav.Link>Payment</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Payment</Nav.Link>
				)}
				{/* {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )} */}
			</Nav>
		</Row>
	);
};

export default CheckoutSteps;
