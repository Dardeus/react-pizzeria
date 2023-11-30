import React, {useState} from "react";

function Categories(){
  const [activeCatIndex, setActiveCatIndex] = useState(1)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return(
    <div className="categories">
      <ul>
        {
          categories.map((value, index) =>
            <li onClick={() => setActiveCatIndex(index)}
                className={activeCatIndex === index ? "active" : ''}>{value}</li>
            )}
      </ul>
    </div>
  )
}

export default Categories