import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Expenses from "./components/expenses/Expenses";
import AddExpense from "./components/forms/AddExpense";

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
    const formData = JSON.stringify({
      id: identifier.id,
    });
    fetch(`delete/${thisMonth}`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-CSRFToken": document.cookie.split(";")[0].split("=")[1],
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
      <AddExpense onAdd={addExpenseHandler} />
      <Expenses
        expenses={expenses}
        onFilter={filterChangeHandler}
        onDelete={deleteHandler}
      />
    </div>
  );
}

export default App;
