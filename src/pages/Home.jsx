import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React, {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSort, setActiveSort] = useState({name: 'популярности (+)', sortProperty: 'rating'});
  const {searchValue} = useContext(SearchContext)

  useEffect(() => {
    setLoading(true);
    const sorting=activeSort.sortProperty

    const url = new URL('https://6569c4f9de53105b0dd79f48.mockapi.io/items');
    if (activeCatIndex) url.searchParams.append('category', activeCatIndex);
    url.searchParams.append('sortBy', sorting.replace('-', ''));
    url.searchParams.append('order', sorting.includes('-') ? 'desc' : 'asc');
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', 4);
    if (searchValue) url.searchParams.append('search', searchValue);

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(arr => {
        setItems(arr)
        setLoading(false)
      })
  }, [activeCatIndex, activeSort, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCatIndex={activeCatIndex} setActiveCatIndex={(i)=>setActiveCatIndex(i)}/>
        <Sort activeSort={activeSort} setActiveSort={(i)=>setActiveSort(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          loading ? [...new Array(8)].map((_, i) => <Skeleton key={i}/>)
                  : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/> )
        }
      </div>
      <Pagination setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default Home