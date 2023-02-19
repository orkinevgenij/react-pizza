import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { MdCleaningServices } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { CartItem } from '../components/CartItem/CartItem'
import { cartSelector, clearItems } from '../redux/slices/cartSlice'
import { CartEmpty } from '../components/CartEmpty/CartEmpty'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(cartSelector)
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)

  const onClickClear = () => {
    if (window.confirm('Ви хочете очистити кошик покупок?')) dispatch(clearItems())
  }

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div className='container container--cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2 className='content__title'>
            <FiShoppingCart fontSize={25} />
            Кошик
          </h2>
          <div className='cart__clear'>
            <MdCleaningServices className='clear-icon' />
            <span onClick={onClickClear}>Очистити кошик</span>
          </div>
        </div>
        <div className='content__items'>
          {items.map((item: any) => (
            <CartItem
              key={item.id}
              {...item}
            />
          ))}
        </div>
        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              Усього піц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сума замовлення: <b>{totalPrice} грн</b>
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              <span>Повернутися назад</span>
            </Link>
            <div className='button pay-btn'>
              <span>Оплатити зараз</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
