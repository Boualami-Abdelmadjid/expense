import { useContext, useState, useRef } from "react";
import Card from "../UI/Card";
import styles from "./AddExpense.module.css";
import csrfContext from "../../expensesContext/expensesContext";
import TextField from "@mui/material/TextField";

const AddExpense = (props) => {
  const thisMonth = (new Date().getMonth() + 1).toString().padStart(2, 0);
  // hooks
  const [isClicked, setIsClicked] = useState(false);
  const csrfCtx = useContext(csrfContext);
  const expenseRef = useRef();
  const valueRef = useRef();

  const csrftoken = csrfCtx.getCookie("csrftoken");

  const EnterPressHandler = (e) => {
    if (e.key === "Enter") buttonClickHandler(e);
  };
  const buttonClickHandler = (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      name: expenseRef.current.value,
      number: valueRef.current.value,
    });
    if (isClicked === false) {
      setIsClicked(true);
    }
    if (isClicked === true) {
      fetch(`add/`, {
        method: "POST",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: formData,
      });
      props.onAdd(thisMonth);
      expenseRef.current.value = valueRef.current.value = "";
      expenseRef.current.focus();
    }
  };
  const cancelClickHandler = (e) => {
    e.preventDefault();
    setIsClicked(false);
  };

  return (
    <Card>
      <form className={styles["Add-expense__form"]}>
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
          {/* <input
            type="text"
            placeholder="Expense"
            ref={expenseRef}
            onKeyDown={EnterPressHandler}
           /> */}
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
        </div>
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
