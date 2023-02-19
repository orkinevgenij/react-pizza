import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'

import { setOrderType, setSortType, SortPropertyEnum, TSort } from '../../redux/slices/filterSlice'
import { useAppDispatch } from '../../redux/store/store'

type TSortListItem = {
  name: string
  sortProperty: SortPropertyEnum
}

type PopupClick = MouseEvent & {
  path: Node[]
}

const sortList: TSortListItem[] = [
  { name: 'За популярністю', sortProperty: SortPropertyEnum.RATING },
  { name: 'За ціною', sortProperty: SortPropertyEnum.PRICE },
  { name: 'За назвою', sortProperty: SortPropertyEnum.TITLE },
]

type TSortPopupProps = {
  sort: TSort
}

export const SortPopup: React.FC<TSortPopupProps> = ({ sort }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  const onClickListItem = (obj: TSort) => {
    dispatch(setSortType(obj))
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])
  return (
    <div
      ref={sortRef}
      className='sort'
    >
      <div className='sort__label'>
        <b>Сортування:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, index) => (
              <li
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                key={index}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='arrow'>
        <span onClick={() => dispatch(setOrderType('asc'))}>
          <AiOutlineArrowUp />
        </span>
        <span onClick={() => dispatch(setOrderType('desc'))}>
          <AiOutlineArrowDown />
        </span>
      </div>
    </div>
  )
}
