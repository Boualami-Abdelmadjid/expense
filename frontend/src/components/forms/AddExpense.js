import { useContext, useState, useRef } from "react";
import Card from "../UI/Card";
import styles from "./AddExpense.module.css";
import csrfContext from "../../expensesContext/expensesContext";
import TextField from "@mui/material/TextField";

const AddExpense = (props) => {
  const thisMonth = (new Date().getMonth() + 1).toString().padStart(2, 0);
  // hooks
  const [isClicked, setIsClicked] = useState(false);
  const [transType, setTransType] = useState("expense");
  const csrfCtx = useContext(csrfContext);
  const expenseRef = useRef();
  const valueRef = useRef();
  const incomeRadioRef = useRef();
  const expenseRadioRef = useRef();

  const csrftoken = csrfCtx.getCookie("csrftoken");

  const EnterPressHandler = (e) => {
    if (e.key === "Enter") {
      buttonClickHandler(e);
    }
  };
  const buttonClickHandler = (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      name: expenseRef.current.value,
      number: valueRef.current.value,
      type: transType,
    });
    if (isClicked === false) {
      setIsClicked(true);
    }
    if (isClicked === true) {
      console.log(csrftoken);
      fetch(`add/${thisMonth}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "X-CSRFToken": csrftoken,
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => props.onAdd(res));
      expenseRef.current.value = valueRef.current.value = "";
    }
    expenseRef.current.focus();
  };
  const cancelClickHandler = (e) => {
    e.preventDefault();
    setIsClicked(false);
  };
  const ValidityHandler = (e) => {
    if (e.key === "Escape") setIsClicked(false);
  };
  function radioHandler() {
    this.current.checked = true;
    setTransType(this.current.id);
  }

  return (
    <Card>
      <form className={styles["Add-expense__form"]} onKeyDown={ValidityHandler}>
        <div
          className={`${styles["expense"]} ${
            isClicked ? "" : styles["hidden"]
          }`}
        >
          <TextField
            id="standard-basic"
            label="Expense"
            variant="standard"
            inputRef={expenseRef}
            onKeyDown={EnterPressHandler}
          />
        </div>
        <div
          className={`${styles["expense"]} ${
            isClicked ? "" : styles["hidden"]
          }`}
        >
          <TextField
            id="standard-basic"
            label="Value"
            variant="standard"
            inputRef={valueRef}
            onKeyDown={EnterPressHandler}
            step="10"
            type="number"
          />
          <div className={styles["radioDiv"]}>
            <input
              type="radio"
              name="radio"
              ref={expenseRadioRef}
              id="expense"
              defaultChecked
            />
            <span onClick={radioHandler.bind(expenseRadioRef)}>Expense</span>
            <input type="radio" name="radio" ref={incomeRadioRef} id="income" />
            <span onClick={radioHandler.bind(incomeRadioRef)}>Income</span>
          </div>
        </div>
        <div></div>
        <button
          className={`${styles["custom-btn"]} ${styles["addBtn"]} ${
            !isClicked ? styles["hidden"] : ""
          }`}
          onClick={cancelClickHandler}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles["custom-btn"]} ${styles["addBtn"]}`}
          onClick={buttonClickHandler}
        >
          Add
        </button>
      </form>
    </Card>
  );
};

export default AddExpense;
