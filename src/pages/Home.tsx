import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from '../components/Pagination/Pagination'

import { filterSelector, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import { fetchPizzas, pizzaSelectorData } from '../redux/slices/pizzaSlice'
import { Categories } from '../components/Categories/Categories'
import { SortPopup } from '../components/Sort/SortPopup'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { useAppDispatch } from '../redux/store/store'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(pizzaSelectorData)
  const { categoryId, sort, currentPage, searchValue, orderType } = useSelector(filterSelector)

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  const onChangePage = (page: number) => dispatch(setCurrentPage(page))

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    const getPizzas = async () => {
      dispatch(
        fetchPizzas({
          sort,
          orderType,
          category,
          search,
          currentPage,
        }),
      )
    }

    getPizzas()
  }, [categoryId, sort.sortProperty, orderType, searchValue, currentPage])

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const pizzas = items.map((obj: any) => (
    <PizzaBlock
      key={obj.id}
      {...obj}
    />
  ))
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          onChangeCategory={onChangeCategory}
          categoryId={categoryId}
        />
        <SortPopup sort={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Виникла помилка😕</h2>
          <p>На жаль, не вдалося отримати піци. Спробуйте повторити спробу</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </div>
  )
}
