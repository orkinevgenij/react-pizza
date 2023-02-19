import React from 'react'
import { Link } from 'react-router-dom'

import emptyCartImg from '../../assets/img/empty-cart.png'

export const CartEmpty: React.FC = () => {
  return (
    <div className='cart cart--empty'>
      <h2>
        Кошик порожній <span>😕</span>
      </h2>
      <p>
        Найімовірніше, ви не замовляли ще піцу. <br />
        Щоб замовити піцу, перейди на головну сторінку.{' '}
      </p>
      <img
        src={emptyCartImg}
        alt='Empty cart'
      />
      <Link
        to='/'
        className='button button--black'
      >
        <span>Повернутися назад</span>
      </Link>
    </div>
  )
}
