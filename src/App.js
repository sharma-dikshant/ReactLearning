import { useState } from "react";

const initialItems = [
  {
    id: 1,
    description: "passports",
    quantity: 2,
    packed: true,
  },
  {
    id: 2,
    description: "mobile charger",
    quantity: 2,
    packed: false,
  },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    // here we can't update the state is items.push(). Because it will mutate the state and in react it is not allowed.
    // so we have to return a new array
    setItems((prevItems) => {
      return [...prevItems, item];
    });
  }

  function handleDeleteItems(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  // so the we want to call this function when we press the cross button
  // the cross button is in PackingList>Item
  // so we have to pass this function as a prop to the PackingList component and from PackingList to Items

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Awaay</h1>;
}

function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    props.onHandleAddItems(newItem);

    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList(props) {
  return (
    <div className="list">
      <ul>
        {props.items.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={props.onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}

function Item(props) {
  return (
    <li>
      <span style={props.item.packed ? { textDecoration: "line-through" } : {}}>
        {props.item.quantity} {props.item.description}{" "}
      </span>
      <button onClick={() => props.onDeleteItems(props.item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return <footer>You have X items on your list.</footer>;
}
