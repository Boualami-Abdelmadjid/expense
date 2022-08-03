import { useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import Card from "../UI/Card";
import FilterExpenses from "./FilterExpenses";

const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "September",
  "Octobre",
  "Nomvembre",
  "Decembre",
];

const Expenses = (props) => {
  let expensesList = props.expenses;

  const [expList, setExpList] = useState(expensesList);
  const [sortType, setSortType] = useState("time");

  useEffect(() => {
    setExpList(expensesList);
  }, [expensesList]);

  useEffect(() => {
    let sorted;
    const sortArray = (type = sortType) => {
      if (type === "expense") {
        sorted = [...expList].sort((a, b) => {
          return a[type].localeCompare(b[type]);
        });
      } else if ((type = "value" || type == "time")) {
        sorted = [...expList].sort((a, b) => {
          return b[type] - a[type];
        });
      }
      setExpList(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  // Calculate the total of the expenses
  let totalExpense = expList
    .filter((el) => el.TransType === "expense")
    .reduce((acc, cur) => acc + cur.value, 0);
  let totalIncome = expList
    .filter((el) => el.TransType === "income")
    .reduce((acc, cur) => acc + cur.value, 0);

  let diffenrence = totalIncome - totalExpense;

  const monthChangedHandler = (enteredMonth) => {
    const monthIndex = months.indexOf(enteredMonth);
    props.onFilter((monthIndex + 1).toString().padStart(2, 0));
  };
  const textSearchHandler = (enteredText) => {
    setExpList(
      props.expenses.filter((el) =>
        el.expense.toLowerCase().includes(enteredText.toLowerCase())
      )
    );
  };

  function deleteHandler() {
    props.onDelete(this);
  }

  const NameSortHandler = () => setSortType("expense");
  const valueSortHandler = () => setSortType("value");
  const DateSortHandler = () => setSortType("time");

  return (
    <Card>
      <FilterExpenses
        months={months}
        onMonthChanged={monthChangedHandler}
        onTextChanged={textSearchHandler}
      />
      <div className={styles.sorting}>
        <p
          className={`${styles.width} ${styles.sort}`}
          onClick={NameSortHandler}
        >
          Name
        </p>
        <p
          className={`${styles.width} ${styles.sort}`}
          onClick={valueSortHandler}
        >
          Value
        </p>
        <p
          className={`${styles.width} ${styles.sort}`}
          onClick={DateSortHandler}
        >
          Date
        </p>
      </div>
      <div className={styles["expensesCard"]}>
        {expList.map((item, index) => {
          const day = item.time.split("-")[2];
          const month = months[item.time.split("-")[1] - 1];
          const type = item.TransType + "Object";
          const identifier = {
            id: item.id,
          };
          return (
            <li
              key={index}
              className={`${styles["expenseItem"]} + ${styles[type]}`}
            >
              <p
                className={`${styles.expense} ${styles.expense} ${styles.width}`}
              >
                {item.expense}
              </p>
              <p className={`expenseValue ${styles.width}`}>{item.value} Dzd</p>
              <p className={styles.width}>
                {day} {month}
              </p>
              <ion-icon
                name="trash-outline"
                className={"delete"}
                onClick={deleteHandler.bind(identifier)}
              ></ion-icon>
            </li>
          );
        })}
      </div>
      <p className={styles.total}>Income: {totalIncome} Dzd</p>
      <p className={styles.total}>Expense: {totalExpense} Dzd</p>
      <p className={styles.total}>Difference: {diffenrence} Dzd</p>
    </Card>
  );
};

export default Expenses;
