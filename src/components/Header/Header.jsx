import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import logoPizza from '../../assets/img/pizza-logo.svg';
import { Search } from '../Search/Search';
import { useSelector } from 'react-redux';
export const Header = ({ searchValue, setSearchValue }) => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img
              width="38"
              src={logoPizza}
              alt="Pizza logo"
            />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="header__cart">
          <Link
            to="cart"
            href="/cart.html"
            className="button button--cart">
            <span>{totalPrice} грн</span>
            <div className="button__delimiter"></div>
            <FiShoppingCart fontSize={25} />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
