import React, { useRef } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { SearchContext } from '../../App';
import { useCallback } from 'react';
import { useState } from 'react';

export const Search = () => {
  const [localSearchValue, setLocalSearchValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setLocalSearchValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
      console.log(value);
    }, 250),
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
