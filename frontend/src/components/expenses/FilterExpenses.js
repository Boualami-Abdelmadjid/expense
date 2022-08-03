import styles from "./FilterExpenses.module.css";
import { useState } from "react";

const FilterExpenses = (props) => {
  const thisMonth = props.months[new Date().getMonth()];
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [searchText, setSearchText] = useState("");

  const monthChanged = (e) => {
    setCurrentMonth(e.target.value);
    props.onMonthChanged(e.target.value);
  };
  const searchHandler = (e) => {
    setSearchText(e.target.value);
    props.onTextChanged(e.target.value);
  };
  return (
    <div className={styles["expenses-filter__control"]}>
      <input
        type="text"
        className={styles.input}
        onChange={searchHandler}
        value={searchText}
      />
      <select id="monthSelect" value={currentMonth} onChange={monthChanged}>
        {props.months.map((mo, index) => {
          return (
            <option value={mo} key={index}>
              {mo}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FilterExpenses;
