import React from 'react'
import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => (
  <div className={styles.root}>
    <h1>
      <span>😕</span>
      <br />
      Нічого не знайдено
    </h1>
    <p className='discription'>На жаль, дані сторінки відсутні в нашому магазині</p>
  </div>
)
