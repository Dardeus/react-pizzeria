import styles from './NotFoundBlock.module.scss'
import React from "react";

const NotFound: React.FC = () => {
  return(
    <h1 className={styles.root}>
      <span>😟</span>
      <br/>
      404 Старница не найдена
    </h1>
  )
}

export default NotFound