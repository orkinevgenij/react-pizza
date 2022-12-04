import React, { useState, useEffect } from 'react';
import { Pagination } from '../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';

import { filterSelector, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaSelectorData } from '../redux/slices/pizzaSlice';
import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Link } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(pizzaSelectorData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const [orderType, setOrderType] = useState('desc');

  const onChangeCategory = (index) => dispatch(setCategoryId(index));

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const getPizzas = async () => {
      dispatch(
        fetchPizzas({
          sort,
          orderType,
          category,
          search,
          currentPage,
        }),
      );
    };

    getPizzas();
  }, [categoryId, sort.sortProperty, orderType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      {...obj}
    />

  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort onClickOrder={setOrderType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
