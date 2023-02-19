import React from 'react'
import { useDispatch } from 'react-redux'
import { BiMinus } from 'react-icons/bi'
import { BiPlus } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'

import { addCartItem, minusItem, removeCartItem, TItems } from '../../redux/slices/cartSlice'

type CartItemProps = {
  id: string
  size: number
  type: string
  title: string
  price: number
  count: number
  imageUrl: string
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  type,
  size,
  title,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch()
  const onClickPlus = () => {
    dispatch(
      addCartItem({
        id,
        size,
        type,
      } as TItems),
    )
  }

  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem({ id, size, type } as TItems))
    }
  }

  const onClickRemove = () => {
    if (window.confirm(`Ти справді хочеш видалити піцу ${title}? 😞`))
      dispatch(removeCartItem({ id, size, type } as TItems))
  }

  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img
          className='pizza-block__image'
          src={imageUrl}
          alt='Pizza'
        />
      </div>
      <div className='cart__item-info'>
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className='cart__item-count'>
        <button
          onClick={() => onClickMinus()}
          className='button button--outline button--circle cart__item-count-minus'
        >
          <BiMinus className='button-minus' />
        </button>
        <b>{count}</b>
        <button
          onClick={() => onClickPlus()}
          className='button button--outline button--circle '
        >
          <BiPlus />
        </button>
      </div>
      <div className='cart__item-price'>
        <b>{price * count} грн</b>
      </div>
      <div className='cart__item-remove'>
        <button
          onClick={() => onClickRemove()}
          className='button button--outline button--circle'
        >
          <VscChromeClose />
        </button>
      </div>
    </div>
  )
}
