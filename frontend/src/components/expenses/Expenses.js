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
  let total = 0;
  props.expenses.forEach((exp) => (total += exp.value));

  const monthChangedHandler = (enteredMonth) => {
    const monthIndex = months.indexOf(enteredMonth);
    props.onFilter((monthIndex + 1).toString().padStart(2, 0));
  };
  function deleteHandler(e) {
    props.onDelete(this);
  }

  return (
    <Card>
      <FilterExpenses months={months} onChange={monthChangedHandler} />
      {props.expenses.map((item, index) => {
        const day = item.time.split("-")[2];
        const month = months[item.time.split("-")[1] - 1];
        const identifier = {
          expense: item.expense,
          value: item.value,
          time: item.time,
        };
        return (
          <li key={index} className={styles.expenseItem}>
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
      <p className={styles.total}>Total: {total} Dzd</p>
    </Card>
  );
};

export default Expenses;
