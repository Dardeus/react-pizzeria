import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React, {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useSelector} from "react-redux";
import axios from "axios";

const Home = () => {
  const categoryIndex = useSelector(state => state.filter.categoryIndex);
  const activeSort = useSelector(state => state.filter.activeSort);
  const currentPage = useSelector(state => state.filter.currentPage);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const {searchValue} = useContext(SearchContext)

  useEffect(() => {
    setLoading(true);
    const sorting=activeSort.sortProperty

    const url = new URL('https://6569c4f9de53105b0dd79f48.mockapi.io/items');
    if (categoryIndex) url.searchParams.append('category', categoryIndex);
    url.searchParams.append('sortBy', sorting.replace('-', ''));
    url.searchParams.append('order', sorting.includes('-') ? 'desc' : 'asc');
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', 4);
    if (searchValue) url.searchParams.append('search', searchValue);

    axios.get(url)
      .then(res => {
        setItems(res.data)
        setLoading(false)
      })
  }, [categoryIndex, activeSort, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          loading ? [...new Array(8)].map((_, i) => <Skeleton key={i}/>)
                  : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/> )
        }
      </div>
      <Pagination/>
    </div>
  )
}

export default Home