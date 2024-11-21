import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";
import "./App.css";

const initialItems = [
  { id: "1", description: "Passports", quantity: 2, packed: false },
  { id: "2", description: "Socks", quantity: 6, packed: false },
  { id: "3", description: "Charger", quantity: 1, packed: false },
  { id: "4", description: "Cans", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([...initialItems]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    const confirm = window.confirm(
      "Are you sure you want to delete all items in the list?"
    );
    if (confirm) setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
