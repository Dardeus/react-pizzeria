import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryIndex} from "../redux/slices/filterSlice";
import {RootState} from "../redux/store";

const Categories: React.FC = () => {
  const categoryIndex = useSelector((state: RootState) => state.filter.categoryIndex)
  const dispatch = useDispatch()

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return(
    <div className="categories">
      <ul>
        {
          categories.map((value, index) =>
            <li key={ index } onClick={() => dispatch(setCategoryIndex(index))}
                className={categoryIndex === index ? "active" : ''}>{value}</li>
            )}
      </ul>
    </div>
  )
}

export default Categories