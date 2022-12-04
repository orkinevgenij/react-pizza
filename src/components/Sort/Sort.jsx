import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { setSortType, sortSelector } from '../../redux/slices/filterSlice';

const list = [
  { name: 'По популярности', sortProperty: 'rating' },
  { name: 'По цене', sortProperty: 'price' },
  { name: 'По названию', sortProperty: 'title' },
];

export const Sort = ({ onClickOrder }) => {
  const dispatch = useDispatch();
  const sort = useSelector(sortSelector);
  const [open, setOpen] = useState(false);
  const sortRef = useRef();

  const onClickListItem = (obj) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={sortRef}
      className="sort">
      <div className="sort__label">
        <b>Сортировка:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                key={index}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="arrow">
        <span onClick={() => onClickOrder('asc')}>
          <AiOutlineArrowUp />
        </span>
        <span onClick={() => onClickOrder('desc')}>
          <AiOutlineArrowDown />
        </span>
      </div>
    </div>
  );
};
