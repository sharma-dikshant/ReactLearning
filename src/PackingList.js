import { useState } from "react";
import { Item } from "./Item";

export function PackingList(props) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = props.items;

  if (sortBy === "description")
    sortedItems = props.items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = props.items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={props.onDeleteItems}
            onHandleTogglePackedItem={props.onHandleTogglePackedItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(evt) => setSortBy(evt.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="packed">Sort by packed</option>
          <option value="description">Sort by description</option>
        </select>
        <button onClick={props.onHandleClearItems}>Clear List</button>
      </div>
    </div>
  );
}
