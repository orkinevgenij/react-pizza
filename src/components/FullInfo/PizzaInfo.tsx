import React from 'react'
import { useState } from 'react'
import styles from './PizzaInfo.module.scss'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export const PizzaInfo: React.FC = () => {

    const [pizzaInfo, setPizzaInfo] = useState<
        {
            imageUrl: string;
            title: string;
            price: number;
            info: string;
        }>()

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios('https://6372628e025414c6370e5f88.mockapi.io/items/' + id)
                setPizzaInfo(data)
            } catch (error) {
                alert('Ошибка загрузки...')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])
    if (!pizzaInfo) {
        return <p> Загрузка...</p>
    }
    return (
        <div className={styles.root}>
            <div className={styles.pizzaImg}>
                <img src={pizzaInfo.imageUrl} alt="" />
            </div>
            <h2>{pizzaInfo.title}</h2>
            <p>{pizzaInfo.info}</p>
            <span>от {pizzaInfo.price} грн</span>
        </div>
    )
}
