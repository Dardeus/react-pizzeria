import styles from './Search.module.scss'
import React, {useCallback, useRef, useState} from "react";
import debounce from 'lodash.debounce'
import {setSearchValue} from "../../redux/slices/filterSlice";
import {useDispatch} from "react-redux";

const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onClickInput = (str: string) => {
    setValue(str)
    debounceSearchValue(str)
  }

  const debounceSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 300),
    [],
  )

  const onClickClose = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.root}>
      <svg className={styles.search_icon} height="512px" id="Layer_1" version="1.1"
           viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg"
           ><path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3
           c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z
           M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,
           0-62.3-12.5-85-35.2 c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,
           85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/></svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onClickInput(e.target.value)}
        className={styles.input}
        placeholder='Поиск пиццы'/>
      {value && (
        <svg
          className={styles.close_icon}
          onClick={onClickClose}
          height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
          <path d="M0 0h48v48H0z" fill="none"/>
        </svg>)
      }
    </div>
  )
}

export default Search