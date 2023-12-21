import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React, {useContext, useEffect, useRef} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {setFilterParams} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

const Home = () => {
  const categoryIndex = useSelector(state => state.filter.categoryIndex);
  const activeSort = useSelector(state => state.filter.activeSort);
  const currentPage = useSelector(state => state.filter.currentPage);
  const navigate = useNavigate()

  const {items, status} = useSelector(state => state.pizzas)
  const {searchValue} = useContext(SearchContext);
  const isSearch = useRef(false);
  const isFirstRender = useRef(true);

  const dispatch = useDispatch();

  const getPizzas = async () => {
    const sorting=activeSort.sortProperty

    const url = new URL('https://6569c4f9de53105b0dd79f48.mockapi.io/items');
    if (categoryIndex) url.searchParams.append('category', categoryIndex);
    url.searchParams.append('sortBy', sorting.replace('-', ''));
    url.searchParams.append('order', sorting.includes('-') ? 'desc' : 'asc');
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', 4);
    if (searchValue) url.searchParams.append('search', searchValue);

    dispatch(fetchPizzas(url))
  }

  useEffect(() => {
    if (window.location.search){
      const params = qs.parse(window.location.search.substring(1))

      const activeSort = sortList.find((item) => item.sortProperty === params.sortProperty)

      dispatch(setFilterParams({ ...params, activeSort, }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryIndex, activeSort, searchValue, currentPage])

  useEffect(() => {
    if (!isFirstRender.current) {
      const queryString = qs.stringify({
        categoryIndex,
        currentPage,
        sortProperty: activeSort.sortProperty,
        searchValue,
      })
      navigate(`?${queryString}`)
    }
    isFirstRender.current = false
  }, [categoryIndex, activeSort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {
        status==="error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка <span>😕</span></h2>
            <p>
              Не удалось получить список пицц. Повторите попытку позже
            </p>
          </div>
        ) : (<div className="content__items">
          {
            status === "loading"
            ? [...new Array(8)].map((_, i) => <Skeleton key={i}/>)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
          }
         </div>)
      }
      <Pagination/>
    </div>
  )
}

export default Home