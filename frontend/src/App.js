import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Expenses from "./components/expenses/Expenses";
import AddExpense from "./components/forms/AddExpense";
import csrfContext from "./expensesContext/expensesContext";

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const thisMonth = (new Date().getMonth() + 1).toString().padStart(2, 0);

function App() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetch(`get/${thisMonth}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);
  // it get executed on add and on filter together to avoid code duplication
  const filterChangeHandler = (month = thisMonth) => {
    fetch(`get/${month}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };
  const deleteHandler = (identifier) => {
    const csrftoken = getCookie("csrftoken");
    const formData = JSON.stringify({
      name: identifier.expense,
      number: identifier.value,
      time: identifier.time,
    });
    fetch(`delete/${thisMonth}`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };
  const addExpenseHandler = (expenses) => setExpenses(expenses);

  return (
    <div className="App">
      <Header />
      <csrfContext.Provider value={{ getCookie: getCookie }}>
        <AddExpense onAdd={addExpenseHandler} />
      </csrfContext.Provider>
      <Expenses
        expenses={expenses}
        onFilter={filterChangeHandler}
        onDelete={deleteHandler}
      />
    </div>
  );
}

export default App;
