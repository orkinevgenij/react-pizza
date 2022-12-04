import React, { useRef, useState } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { MdClose } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search = () => {
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState('');
  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setLocalSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 200),
    [],
  );

  const onChangeInput = (event) => {
    setLocalSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <BiSearch className={styles.searchIcon} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы..."
        value={localSearchValue}
        onChange={onChangeInput}
      />
      {localSearchValue && (
        <MdClose
          onClick={onClickClear}
          className={styles.clearIcon}
        />
      )}
    </div>
  );
};
