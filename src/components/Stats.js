export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="items-list-description">
        <p>Start adding some items to your packing list 🚀</p>
      </footer>
    );

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
