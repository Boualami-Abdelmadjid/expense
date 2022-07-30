import styles from "./FilterExpenses.module.css";
import { useState } from "react";

const FilterExpenses = (props) => {
  const thisMonth = props.months[new Date().getMonth()];
  const [currentMonth, setCurrentMonth] = useState(thisMonth);

  const monthChanged = (e) => {
    setCurrentMonth(e.target.value);
    props.onChange(e.target.value);
  };
  return (
    <div className={styles["expenses-filter__control"]}>
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
