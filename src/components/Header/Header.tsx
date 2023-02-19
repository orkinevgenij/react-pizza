import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useSelector } from 'react-redux'

import logoPizza from '../../assets/img/pizza-logo.svg'
import { Search } from '../Search/Search'
import { cartSelector } from '../../redux/slices/cartSlice'

export const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(cartSelector)
  const { pathname } = useLocation()
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)
  return (
    <div className='header'>
      <div className='container'>
        <Link to='/'>
          <div className='header__logo'>
            <img
              width='38'
              src={logoPizza}
              alt='Pizza logo'
            />
            <div>
              <h1>Pizza</h1>
            </div>
          </div>
        </Link>
        {pathname !== '/cart' && <Search />}
        <div className='header__cart'>
          {pathname !== '/cart' && (
            <Link
              to='cart'
              className='button button--cart'
            >
              <span>{totalPrice} грн</span>
              <FiShoppingCart fontSize={25} />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
