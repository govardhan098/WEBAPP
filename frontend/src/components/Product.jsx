import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-2 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating rating={product.rating} reviews={product.numReviews} />
          </div>
        </Card.Text>

        <Card.Text as="h4">&#8377;{Number(product.price).toLocaleString('en-IN')}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
