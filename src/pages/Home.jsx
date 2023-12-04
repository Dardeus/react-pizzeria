import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React, {useEffect, useState} from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [activeSort, setActiveSort] = useState({name: 'популярности (+)', sortProperty: 'rating'});

  useEffect(() => {
    setLoading(true);
    const sorting=activeSort.sortProperty
    fetch(
      `https://6569c4f9de53105b0dd79f48.mockapi.io/items?${
        activeCatIndex ? `category=${activeCatIndex}`: ''
      }&sortBy=${sorting.replace('-', '')
      }&order=${sorting.includes('-') ? 'desc' : 'asc'}`)
      .then(res => {
        return res.json()
      })
      .then(arr => {
        setItems(arr)
        setLoading(false)
      })
  }, [activeCatIndex, activeSort])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCatIndex={activeCatIndex} setActiveCatIndex={(i)=>setActiveCatIndex(i)}/>
        <Sort activeSort={activeSort} setActiveSort={(i)=>setActiveSort(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          loading ? [...new Array(8)].map((_, i) => <Skeleton key={i}/>) :
            items.map((obj) => <PizzaBlock key={obj.id} {...obj}/> )
        }
      </div>
    </div>
  )
}

export default Home