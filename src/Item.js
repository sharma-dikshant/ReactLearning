export function Item(props) {
  return (
    <li>
      <input
        type="checkbox"
        value={props.item.packed}
        onChange={() => props.onHandleTogglePackedItem(props.item.id)}
      ></input>
      <span style={props.item.packed ? { textDecoration: "line-through" } : {}}>
        {props.item.quantity} {props.item.description}{" "}
      </span>
      <button onClick={() => props.onDeleteItems(props.item.id)}>❌</button>
    </li>
  );
}
