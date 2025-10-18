import React from 'react';
import './Product.css';
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from '../context/StateContext';

function Product({ id, title, price, rating, image }) {
    const [, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="product__star" />
                        ))}
                </div>
            </div>
            <img src={image} alt={title} />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
}

export default Product;