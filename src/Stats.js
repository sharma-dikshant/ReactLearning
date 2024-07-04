export function Stats({ items }) {
  const totalItems = items.length;
  const totalPackedItems = items.filter((item) => item.packed).length;
  const PercentCompleted = Math.round((totalPackedItems / totalItems) * 100);
  return (
    <footer>
      {items.length === 0
        ? "No Items in List.."
        : PercentCompleted === 100
          ? "You are all packed!"
          : `You have ${totalItems} items on your list. ${totalPackedItems} were already packed (${PercentCompleted}%)`}
    </footer>
  );
}
