import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import React, {useEffect, useState} from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('https://6569c4f9de53105b0dd79f48.mockapi.io/items')
      .then(res => {
        return res.json()
      })
      .then(arr => {
        setItems(arr)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
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