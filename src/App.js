import { useState } from "react";
import Logo from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState(
    localStorage.length ? JSON.parse(localStorage.getItem("items")) : []
  );
  function handleAddItems(item) {
    // here we can't update the state is items.push(). Because it will mutate the state and in react it is not allowed.
    // so we have to return a new array
    setItems((prevItems) => {
      const newList = [...prevItems, item];
      localStorage.setItem("items", JSON.stringify(newList));
      return newList;
    });
  }

  function handleDeleteItems(id) {
    let newList = items.filter((item) => item.id !== id);
    setItems(newList);
    localStorage.setItem("items", JSON.stringify(newList));
    console.log(items);
  }

  function handleTogglePackedItem(id) {
    let newList = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  }

  function handleClearItems() {
    setItems([]);
    localStorage.clear();
  }

  // so the we want to call this function when we press the cross button
  // the cross button is in PackingList>Item
  // so we have to pass this function as a prop to the PackingList component and from PackingList to Items

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onHandleTogglePackedItem={handleTogglePackedItem}
        onHandleClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
