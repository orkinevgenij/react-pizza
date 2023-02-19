import { useSet } from 'ahooks'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addCartItem, TItems, cartSelectorById } from '../../redux/slices/cartSlice'

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const typesNames = ['тонке', 'традиційне']

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(cartSelectorById(id))
  const addedCount = cartItems.reduce((sum: number, item: any) => sum + item.count, 0)
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const onClickAddToCart = () => {
    const item: TItems = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addCartItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link
          key={id}
          to={`/pizza/${id}`}
        >
          <img
            className='pizza-block__image'
            src={imageUrl}
            alt='Pizza'
          />
          <h5 className='pizza-block__title'>{title}</h5>
        </Link>
        <div className='pizza-block__selector'>
          <ul>
            {types.map(typeId => (
              <li
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
                key={typeId}
              >
                {typesNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
                key={index}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div
          onClick={onClickAddToCart}
          className='pizza-block__bottom'
        >
          <div className='pizza-block__price'>вiд {price} грн</div>
          <div className='button button--outline button--add'>
            <FiPlus className='button-icon' />
            <span>Додати</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  )
}
