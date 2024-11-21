import { useState } from "react";
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

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
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

function Form({ onAddItems }) {
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

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
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

function PackingList({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="items-list">
      <ul className="items">
        {items.map((item) => (
          <Item
            key={item.id}
            itemObj={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
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

function Item({ itemObj, onDeleteItem, onToggleItems }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        value={itemObj.packed}
        onChange={() => onToggleItems(itemObj.id)}
        checked={itemObj.packed}
      />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="items-list-description">
      <p>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `🧳 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </p>
    </footer>
  );
}
