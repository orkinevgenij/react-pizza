import React from 'react'
const categories = ['Усі', 'М`ясні', 'Вегетаріанські', 'Сирні']

type CategoriesProps = {
  categoryId: number
  onChangeCategory: (index: number) => void
}
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    return (
      <div className='categories'>
        <ul>
          {categories.map((categoryName, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                className={categoryId === index ? 'active' : ''}
              >
                {categoryName}
              </li>
            )
          })}
        </ul>
      </div>
    )
  },
)
