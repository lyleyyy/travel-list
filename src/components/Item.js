export default function Item({ itemObj, onDeleteItem, onToggleItems }) {
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
