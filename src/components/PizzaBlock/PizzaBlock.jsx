import React from 'react';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCartItem, cartSelector, cartSelectorById } from '../../redux/slices/cartSlice';

const typesNames = ['тонкое', 'традиционное'];

export const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  // const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id && obj.size));
  const cartItems = useSelector(cartSelectorById(id))
  const addedCount = cartItems.reduce((sum, item) => sum + item.count, 0);
  // const addedCount = cartItem ? cartItem.count : 0;

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addCartItem(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id}
          to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
                key={typeId}>
                {typesNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
                key={index}>
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div
          onClick={onClickAdd}
          className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} грн</div>
          <div className="button button--outline button--add">
            <FiPlus className="button-icon" />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};
