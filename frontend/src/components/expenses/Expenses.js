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
  // Calculate the total of the expenses
  let totalExpense = props.expenses
    .filter((el) => el.TransType === "expense")
    .reduce((acc, cur) => acc + cur.value, 0);
  let totalIncome = props.expenses
    .filter((el) => el.TransType === "income")
    .reduce((acc, cur) => acc + cur.value, 0);

  let diffenrence = totalIncome - totalExpense;

  // .reduce((acc, cur) => acc.value + cur, 0);

  const monthChangedHandler = (enteredMonth) => {
    const monthIndex = months.indexOf(enteredMonth);
    props.onFilter((monthIndex + 1).toString().padStart(2, 0));
  };
  function deleteHandler() {
    props.onDelete(this);
    console.log(this);
  }

  return (
    <Card>
      <FilterExpenses months={months} onChange={monthChangedHandler} />
      <div className={styles["expensesCard"]}>
        {props.expenses.map((item, index) => {
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
              <p className={styles.expense + " expense"}>{item.expense}</p>
              <p className="expenseValue">{item.value} Dzd</p>
              <p>
                {day} {month}
              </p>
              <ion-icon
                name="trash-outline"
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
