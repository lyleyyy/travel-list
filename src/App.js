import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: "1", description: "Passports", quantity: 2, packed: false },
  { id: "2", description: "Socks", quantity: 6, packed: false },
  { id: "3", description: "Charger", quantity: 1, packed: false },
  { id: "4", description: "Cans", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div className="heading">
      <h1>🏝️ FAR AWAY 🧳</h1>
    </div>
  );
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      package: false,
      id: Math.random().toString(),
    };
    console.log(newItem);
  };

  return (
    <form className="items-add-bar" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="items-list">
      <ul className="items">
        {initialItems.map((item) => (
          <Item key={item.id} itemObj={item} />
        ))}
      </ul>
      <div className="list-btns">
        <select>
          <option type="text">SORT BY INPUT ORDER</option>
          <option type="text">SORT BY DESCRIPTION</option>
          <option type="text">SORT BY PACKED STATUS</option>
        </select>
        <button>CLEAR LIST</button>
      </div>
    </div>
  );
}

function Item({ itemObj }) {
  return (
    <li className="item">
      <input type="checkbox" />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <div className="items-list-description">
      <p>🧳 You have 4 items on your list, and you already packed 2 (50%)</p>
    </div>
  );
}
